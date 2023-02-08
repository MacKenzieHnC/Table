#ifdef RCT_NEW_ARCH_ENABLED
#import "TableView.h"

#import <react/renderer/components/RNTableViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNTableViewSpec/EventEmitters.h>
#import <react/renderer/components/RNTableViewSpec/Props.h>
#import <react/renderer/components/RNTableViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "Utils.h"

using namespace facebook::react;

@interface TableView () <RCTTableViewViewProtocol>

@end

@implementation TableView {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<TableViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const TableViewProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<TableViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<TableViewProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor: [Utils hexStringToColor:colorToConvert]];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> TableViewCls(void)
{
    return TableView.class;
}

@end
#endif
