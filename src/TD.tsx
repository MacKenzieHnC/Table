import React from "react";
import { LayoutChangeEvent, View } from "react-native";

// Props
export interface ITD {
  children?: any;
  requestWidth?: Function;
  desiredWidthIsDefined?: Function;
  getWidth?: Function;
}

// Component
export function TD({
  children,
  requestWidth,
  desiredWidthIsDefined,
  getWidth,
}: ITD) {
  const onLayout = (event: LayoutChangeEvent) => {
    if (requestWidth && desiredWidthIsDefined && !desiredWidthIsDefined()) {
      requestWidth(Math.ceil(event.nativeEvent.layout.width));
    }
  };
  if (!getWidth) {
    return <View />;
  }
  return (
    <View onLayout={onLayout} style={{ width: getWidth() }}>
      {children}
    </View>
  );
}
