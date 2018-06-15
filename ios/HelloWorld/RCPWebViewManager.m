//
//  RCPWebView.m
//  HelloWorld
//
//  Created by Allan Marques Baptista on 15/06/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RCPWebViewManager.h"
#import "RCPWebView.h"

@implementation RCPWebViewManager

RCT_EXPORT_MODULE(WebView)

RCT_CUSTOM_VIEW_PROPERTY(src, NSString, RCPWebView)
{
  NSURL *url = [NSURL URLWithString:[RCTConvert NSString:json]];
  NSURLRequest *urlRequest = [NSURLRequest requestWithURL:url];
  
  [view loadRequest:urlRequest];
}

RCT_EXPORT_VIEW_PROPERTY(onLoaded, RCTDirectEventBlock)

- (UIView *)view
{
  UIWebView *view = [[RCPWebView alloc] init];
  
  view.delegate = self;
  
  return view;
}

- (void) webViewDidFinishLoad:(RCPWebView *)webView
{
  if (webView.onLoaded) {
    webView.onLoaded(nil);
  }
}

@end
