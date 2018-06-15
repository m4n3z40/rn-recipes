//
//  RCPToast.m
//  HelloWorld
//
//  Created by Allan Marques Baptista on 14/06/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "React/RCTConvert.h"
#import "UIView+Toast.h"
#import "RCPToast.h"

@implementation RCPToast

RCT_EXPORT_MODULE(Toast)

- (double)getDuration: (NSString *)duration
{
  if ([duration isEqualToString: @"long"]) {
    return 5.0;
  }
  
  return 2.0;
}

- (NSString *)getPosition: (NSString *)position
{
  if ([position isEqualToString:@"top"]) {
    return CSToastPositionTop;
  }
  
  if ([position isEqualToString:@"center"]) {
    return CSToastPositionCenter;
  }
  
  return CSToastPositionBottom;
}

RCT_EXPORT_METHOD(show: (NSString *) msg options: (NSDictionary *) options)
{
  NSString *duration = [RCTConvert NSString:options[@"duration"]];
  NSString *position = [RCTConvert NSString:options[@"position"]];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [[[[UIApplication sharedApplication] windows] firstObject]
     makeToast: msg
     duration: [self getDuration: duration]
     position: [self getPosition: position]
    ];
  });
}

@end
