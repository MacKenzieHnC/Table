import React from 'react';
import { LayoutChangeEvent, View } from 'react-native';

// Props
export interface ITD {
  children?: any;
  requestWidth?: Function;
  getWidth?: Function;
  restrained?: boolean;
}

// Component
export function TD({
  children,
  requestWidth,
  getWidth,
  restrained = false,
}: ITD) {
  const onLayout = (event: LayoutChangeEvent) => {
    if (requestWidth && !restrained) {
      requestWidth(Math.ceil(event.nativeEvent.layout.width));
    }
  };
  return (
    <View
      onLayout={onLayout}
      style={getWidth && restrained ? { width: getWidth() } : {}}
    >
      {children}
    </View>
  );
}
