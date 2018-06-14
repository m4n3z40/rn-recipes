package com.helloworld;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class Toast extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "Toast";
    }

    public Toast(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("SHORT", android.widget.Toast.LENGTH_SHORT);
        constants.put("LONG", android.widget.Toast.LENGTH_LONG);

        return  constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        android.widget.Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
}
