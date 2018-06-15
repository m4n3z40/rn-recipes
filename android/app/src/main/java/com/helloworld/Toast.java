package com.helloworld;

import android.view.Gravity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

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

    private int getDuration(String duration) {
        switch (duration) {
            case "long":
                return android.widget.Toast.LENGTH_LONG;
            case "short":
            default:
                return android.widget.Toast.LENGTH_SHORT;
        }
    }

    private int getPosition(String position) {
        switch (position) {
            case "top":
                return Gravity.TOP;
            case "center":
                return Gravity.CENTER;
            case "bottom":
            default:
                return Gravity.BOTTOM;
        }
    }

    @ReactMethod
    public void show(String message, ReadableMap options) {
        String duration = options.getString("duration");
        String position = options.getString("position");

        android.widget.Toast toast = android.widget.Toast.makeText(getReactApplicationContext(), message, getDuration(duration));

        toast.setGravity(getPosition(position), 0, 0);
        toast.show();
    }
}
