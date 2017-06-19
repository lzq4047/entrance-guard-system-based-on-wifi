package com.wifientranceguardsystem;

import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.Observable;

/**
 * Created by Listener on 2017/5/26.
 */

public class UDPSocket extends ReactContextBaseJavaModule {

    public Handler handler = null;
    private ReactContext reactContext = this.getReactApplicationContext();
    private Socket_Audio socket_audio;

    public UDPSocket(ReactApplicationContext reactContext) {
        super(reactContext);
        this.handler = new MessageHandler(Looper.getMainLooper());
        socket_audio = new Socket_Audio(handler);
        new Thread(socket_audio).start();
    }
    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public String getName() {
        return "UDPSocket";
    }

    @ReactMethod
    public void send(String msg) {
//        String buf = "hello,i am jdh1";
//        socket_audio.send(buf.getBytes(),buf.length());
//        for (int i = 0;i < 20;i++)
//        {
//            String buf1 = "UDP:I AM JDH" + i;
            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            socket_audio.send(msg.getBytes(),msg.length());
//        }
        return;
    }
    private class MessageHandler extends Handler {

        public MessageHandler(Looper looper) {
            super(looper);
        }

        @Override
        public void handleMessage(Message msg) {
            if(msg.what == 1){
                WritableMap params = Arguments.createMap();
                params.putString("message", new String((byte[]) msg.obj, 0, msg.arg1));
                // 收到消息通过事件发送给ReactNative
                sendEvent(reactContext, "onSocketReceive", params);
            }
        }
    }
}