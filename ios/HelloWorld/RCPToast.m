//
//  RCPToast.m
//  HelloWorld
//
//  Created by Allan Marques Baptista on 14/06/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UIView+Toast.h"
#import "RCPToast.h"

@implementation RCPToast

RCT_EXPORT_MODULE(Toast)

RCT_EXPORT_METHOD(show: (NSString *) msg duration: (double) duration)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [[[[UIApplication sharedApplication] windows] firstObject]
     makeToast:msg
     duration:duration
     position:CSToastPositionBottom
    ];
  });
}

- (NSDictionary *) constantsToExport
{
  return @{
    @"SHORT": @1.5,
    @"LONG": @5.0
  };
}

@end
