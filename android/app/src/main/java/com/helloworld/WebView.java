package com.helloworld;

import android.os.Build;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;
import javax.annotation.Nullable;

public class WebView extends SimpleViewManager<android.webkit.WebView> {
    @Override
    public String getName() {
        return "WebView";
    }

    private void dispatchOnLoaded (android.webkit.WebView view) {
        ReactContext reactContext = (ReactContext) view.getContext();

        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(view.getId(), "loaded", null);
    }

    @Override
    public @Nullable Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.builder()
            .put(
                "loaded",
                MapBuilder.of("registrationName", "onLoaded")
            )
            .build();
    }

    @Override
    protected android.webkit.WebView createViewInstance(final ThemedReactContext reactContext) {
        android.webkit.WebView view = new android.webkit.WebView(reactContext);

        if (Build.VERSION.SDK_INT >= 21) {
            view.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }

        view.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(android.webkit.WebView view, String url) {
                dispatchOnLoaded(view);
            }
        });

        return view;
    }

    @ReactProp(name = "src")
    public void setSrc(android.webkit.WebView view, String src) {
        view.loadUrl(src);
    }
}
