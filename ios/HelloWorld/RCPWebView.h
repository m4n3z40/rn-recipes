//
//  RCPWebView.h
//  HelloWorld
//
//  Created by Allan Marques Baptista on 15/06/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@interface RCPWebView : UIWebView

@property (nonatomic, copy) RCTDirectEventBlock onLoaded;

@end
