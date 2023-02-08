// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

#ifndef TableViewNativeComponent_h
#define TableViewNativeComponent_h

NS_ASSUME_NONNULL_BEGIN

@interface TableView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END

#endif /* TableViewNativeComponent_h */
#endif /* RCT_NEW_ARCH_ENABLED */
