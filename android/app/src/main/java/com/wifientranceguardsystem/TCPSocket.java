package com.wifientranceguardsystem;

import android.os.Handler;
import android.os.Message;
import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.Socket;

/**
 * Created by Listener on 2017/4/23.
 */
public class TCPSocket extends ReactContextBaseJavaModule {
    private Socket socket = null;
    // 接收线程
    public Handler handler = null;
    private ReactContext reactContext = this.getReactApplicationContext();

    public TCPSocket(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public String getName() {
        return "TCPSocket";
    }

    @ReactMethod
    public void connect(String ip, int port, Promise promise) {
        try {
            socket = new Socket(ip, port);
            handler = new MessageHandler();
            new Thread(new ReceiveThread(socket)).start();
            if (socket.isConnected()) {
                promise.resolve(null);
            }
        } catch (IOException e) {
            e.printStackTrace();
            promise.reject("ECONN", e.getMessage());
        }
    }

    @ReactMethod
    public void send(String msg, Promise promise) {
        OutputStream os = null;
        try {
            os = socket.getOutputStream();//获得socket的输出流
            os.write(msg.getBytes("utf-8"));//输出EditText的内容
            os.flush();
            promise.resolve(msg);
        } catch (IOException e) {
            e.printStackTrace();
            promise.reject("ESOCKET", e.getMessage());
        }
    }

    private class ReceiveThread extends Thread {
        private InputStream inputStream = null;
        private String line;

        public ReceiveThread(Socket socket) {
            try {
                inputStream = socket.getInputStream();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        public void run() {
            while (true) {
                BufferedReader bufferedReader = null;
                try {
                    bufferedReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                try {
                    assert bufferedReader != null;
                    line = bufferedReader.readLine();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                if (line != null) {
                    Message msg = handler.obtainMessage();
                    msg.what = 1;
                    msg.obj = line;
                    handler.sendMessage(msg);
                }
            }
        }
    }

    private class MessageHandler extends Handler{
        @Override
        public void handleMessage(Message msg) {
            if(msg.what == 1){
                WritableMap params = Arguments.createMap();
                params.putString("message", msg.obj.toString());
                // 收到消息通过事件发送给ReactNative
                sendEvent(reactContext, "onSocketReceive", params);
            }
        }
    }
}

