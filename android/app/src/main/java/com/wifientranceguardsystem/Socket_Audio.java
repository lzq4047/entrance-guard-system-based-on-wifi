package com.wifientranceguardsystem;

import android.os.Handler;
import android.os.Message;
import android.util.Log;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.Observable;

public class Socket_Audio extends Observable implements Runnable {

    //常量
    //服务器IP
    private final String SERVER_IP = "192.168.4.1";
    //语音端口
    private final int SERVER_PORT_AUDIO = 8235;
    //本地端口
    private final int LOCAL_PORT_AUDIO = 8266;

    //网络相关变量
    //最大帧长
    private static final int MAX_DATA_PACKET_LENGTH = 1024;
    //接收数据缓存
    private byte[] Buffer_Receive = new byte[MAX_DATA_PACKET_LENGTH];

//    private StringBuilder Frame_Receive = new StringBuilder(MAX_DATA_PACKET_LENGTH);

    //接收数据包
    private DatagramPacket Packet_Receive;
    //端口
    private DatagramSocket Udp_Socket;

    Handler handler;
    /**
     * @brief 构造函数
     * @param handler
     */
    public Socket_Audio(Handler handler)
    {
        this.handler = handler;
        try
        {
            //端口
            Udp_Socket = new DatagramSocket(LOCAL_PORT_AUDIO);
            //接收包
            Packet_Receive = new DatagramPacket(Buffer_Receive, MAX_DATA_PACKET_LENGTH);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    /**
     * @brief 发送数据
     * @param data:需要发送的数据
     * @param len:数据字节数据
     */
    public void send(byte[] data, int len)
    {
        Thread_Send thread_send = new Thread_Send(data, len);
        new Thread(thread_send).start();
    }

    @Override
    public void run() {
        while (true)
        {
            try
            {
                Log.d("lzq", "before receive");
                //接收数据
                Udp_Socket.receive(Packet_Receive);
//                //打印接收数据
//                System.out.println(new String(Buffer_Receive,0,Packet_Receive.getLength()));

                //判断数据是否合法
                Log.d("lzq", "receive");
                InetSocketAddress address = (InetSocketAddress) Packet_Receive.getSocketAddress();
                //判断是否是调度服务器的ip
                if (!address.getAddress().getHostAddress().equals(SERVER_IP))
                {
                    continue;
                }
                //判断是否是调度服务器的端口
                if (address.getPort() != SERVER_PORT_AUDIO)
                {
                    continue;
                }
                Message msg = handler.obtainMessage();
                msg.what = 1;
                msg.obj = Packet_Receive.getData();
                msg.arg1 = Packet_Receive.getLength();
                handler.sendMessage(msg);
                //通知观察者
//                setChanged();
//                notifyObservers(Packet_Receive);
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }

    /**
     * @brief 发送线程
     */
    private class Thread_Send implements Runnable {
        //发送数据缓存
        private byte[] Buffer_Send = new byte[MAX_DATA_PACKET_LENGTH];
        //发送数据包
        private DatagramPacket Packet_Send;

        /**
         * @brief 构造函数
         * @param data:需要发送的数据
         * @param len:数据字节数据
         */
        public Thread_Send(byte[] data, int len) {
            //发送包
            Packet_Send = new DatagramPacket(Buffer_Send, MAX_DATA_PACKET_LENGTH);
            Packet_Send.setData(data);
            Packet_Send.setLength(len);
        }

        @Override
        public void run() {
            try {
                Packet_Send.setPort(SERVER_PORT_AUDIO);
                Packet_Send.setAddress(InetAddress.getByName(SERVER_IP));
                Udp_Socket.send(Packet_Send);
            } catch (UnknownHostException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}