package com.wifientranceguardsystem;

import android.os.Build;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Listener on 2017/4/17.
 */

public class DeviceInfo extends ReactContextBaseJavaModule {
    public DeviceInfo(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DeviceInfo";
    }

    @ReactMethod
    void getSerialNumber(Promise promise) {
        String serialNumber = Build.SERIAL;
        if (serialNumber == null) {
            promise.reject("EGETSERIALNUMBER", "error to get serial number");
        } else {
            promise.resolve(serialNumber);
        }
    }
}