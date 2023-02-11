/* eslint-disable react-native/no-inline-styles */
import React, { Children, cloneElement } from 'react';
import { ScrollView, Text, View, ViewStyle } from 'react-native';
import TableViewNativeComponent from './TableViewNativeComponent';
import type { ITD } from './TD';
import type { ITR } from './TR';

/**
 * Table
 */
interface ITable {
  children: React.ReactElement<ITD>[][] | React.ReactElement<ITD>[];
  style?: ViewStyle;
}
export function Table({ children, style }: ITable) {
  let size = [1, 1];

  // Check all rows have the same number of columns
  // if (Array.isArray(children)) {
  //   size[0] = children.length;
  //   (children as React.ReactElement<ITR>[]).forEach((row, rowIndex) => {
  //     if (Array.isArray(row.props.children)) {
  //       if (rowIndex === 0) {
  //         size[1] = row.props.children.length;
  //       } else if (row.props.children.length !== size[1]) {
  //         throw Error(
  //           'All rows in Table need to have the same number of columns!'
  //         );
  //       }
  //     } else if (rowIndex !== 0 && size[1] !== 1) {
  //       throw Error(
  //         'All rows in Table need to have the same number of columns!'
  //       );
  //     }
  //   });
  // }

  // While calculating measurements
  return (
    <View
      style={{
        ...style,
        backgroundColor: '#044',
        flexDirection: 'row',
        flexShrink: 1,
        alignSelf: 'center',
      }}
    >
      <TableViewNativeComponent columnCount={Children.toArray(children).length}>
        <Text style={{ color: 'white' }}>What</Text>
        <Text style={{ color: 'white' }}>Helloasdfasdfasdf</Text>
        <Text style={{ color: 'white' }}>Helloasdfasdfasf</Text>
        <Text style={{ color: 'white' }}>Helloasdfasdf</Text>
        <Text style={{ color: 'white' }}>Hello</Text>
        <Text style={{ color: 'white' }}>Hellasdfasdfo</Text>
        <Text style={{ color: 'white' }}>Hellaso</Text>
      </TableViewNativeComponent>
    </View>
  );
}
