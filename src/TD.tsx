import React from 'react';
import { View } from 'react-native';

// Props
export interface ITD {
  children?: any;
}

// Component
export function TD({ children }: ITD) {
  return <View>{children}</View>;
}
