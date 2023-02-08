/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ViewStyle } from 'react-native';
import TableViewNativeComponent from './TableViewNativeComponent';
import type { ITR } from './TR';

/**
 * Table
 */
interface ITable {
  children: React.ReactElement<ITR>[] | React.ReactElement<ITR>;
  style?: ViewStyle;
}
export function Table({ children, style }: ITable) {
  let size = [1, 1];

  // Check all rows have the same number of columns
  if (Array.isArray(children)) {
    size[0] = children.length;
    (children as React.ReactElement<ITR>[]).forEach((row, rowIndex) => {
      if (Array.isArray(row.props.children)) {
        if (rowIndex === 0) {
          size[1] = row.props.children.length;
        } else if (row.props.children.length !== size[1]) {
          throw Error(
            'All rows in Table need to have the same number of columns!'
          );
        }
      } else if (rowIndex !== 0 && size[1] !== 1) {
        throw Error(
          'All rows in Table need to have the same number of columns!'
        );
      }
    });
  }

  // While calculating measurements
  return (
    <TableViewNativeComponent>
      <View style={{ ...style, borderWidth: 1 }}>{children}</View>
    </TableViewNativeComponent>
  );
}
