/* eslint-disable react-native/no-inline-styles */
import React, { cloneElement, useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView, View, ViewStyle } from 'react-native';
import type { ITR } from './TR';

/**
 * Table
 */
interface ITable {
  children: React.ReactElement<ITR>[] | React.ReactElement<ITR>;
  style?: ViewStyle;
  priviledgedColumns?: number[];
}
export function Table({ children, style, priviledgedColumns = [] }: ITable) {
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

  // State
  const [scrollViewWidth, setScrollViewWidth] = useState(1000);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const desiredWidth = useRef(
    Array.from(Array(size[0]), () => new Array<number>(size[1] as number))
  );
  const [colWidth, setColWidth] = useState(Array(size[1]));
  const unrestrainedChildren = useRef(
    Array.isArray(children)
      ? Array(children.length)
      : cloneElement(children, {})
  );
  if (!desiredWidth || !desiredWidth.current || !colWidth) {
    return <View />;
  }

  /*
   * Utility functions
   */
  const getDesiredMax = (colIndex: number) => {
    return Math.max(
      ...desiredWidth.current.map(
        (desiredWidthRow) => desiredWidthRow[colIndex] as number
      )
    );
  };

  const desiredWidthContainsUndefined = () => {
    if (desiredWidth.current === undefined) {
      return true;
    }
    for (let row = 0; row < desiredWidth.current.length; row++) {
      for (
        let col = 0;
        col < (desiredWidth.current[row] as number[]).length;
        col++
      ) {
        if ((desiredWidth.current[row] as number[])[col] === undefined) {
          return true;
        }
      }
    }
    return false;
  };

  /*
   * This is where the magic happens
   */
  const onLayoutChange = (event: LayoutChangeEvent) => {
    // Make ScrollView as big as it needs to be
    if (isMeasuring && scrollViewWidth - event.nativeEvent.layout.width <= 10) {
      setScrollViewWidth(scrollViewWidth * 2);
    }
    // Calculate column sizes
    else {
      let updatedColWidth = [...colWidth]; // This will store our calculations, so we don't get race conditions
      let remainingWidth = event.nativeEvent.layout.width;
      let remainingCols = Array.from(
        Array<number[]>(size[1] as number),
        (_cell, index) => {
          return index;
        }
      );

      // Ignore priviledge columns
      priviledgedColumns.forEach((col) => {
        const width = getDesiredMax(col);
        updatedColWidth[col] = width;
        remainingWidth -= width;
        remainingCols = remainingCols.filter((x) => x !== col);
      });

      // Divide remaining space fairly
      remainingCols.forEach((col) => {
        const max = getDesiredMax(col);
        const fairShare = remainingWidth / remainingCols.length;
        let width = 0;
        if (max < fairShare) {
          width = max;
        } else {
          width = fairShare;
        }
        updatedColWidth[col] = width;
        remainingWidth -= width;
        remainingCols = remainingCols.filter((x) => x !== col);
      });

      setColWidth(updatedColWidth); // Okay, NOW we can update
    }
  };

  // Add necessary functions to cells
  if (Array.isArray(children)) {
    let newUnrestrainedChildren = Array(children.length);
    (children as React.ReactElement<ITR>[]).forEach((row, rowIndex) => {
      if (Array.isArray(row.props.children)) {
        let newCells: React.ReactElement[] = [];
        let unrestrainedCells: React.ReactElement[] = [];
        row.props.children.forEach((cell, colIndex) => {
          newCells.push(
            cloneElement(
              cell,
              {
                restrained: true,
                getWidth: () => {
                  return colWidth[colIndex];
                },
              },
              cell.props.children
            )
          );
          unrestrainedCells.push(
            cloneElement(
              cell,
              {
                restrained: false,
                requestWidth: (width: number) => {
                  (desiredWidth.current[rowIndex] as number[])[colIndex] =
                    width;
                  if (!desiredWidthContainsUndefined()) {
                    setIsMeasuring(false);
                  }
                },
              },
              cell.props.children
            )
          );
        });
        children[rowIndex] = cloneElement(row, {}, newCells);
        newUnrestrainedChildren[rowIndex] = cloneElement(
          row,
          {},
          unrestrainedCells
        );
      }
    });
    unrestrainedChildren.current = newUnrestrainedChildren;
  }

  // While calculating measurements
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          width: scrollViewWidth,
          alignItems: 'flex-start',
        }}
        style={{ width: 0, height: 0 }}
      >
        <View onLayout={onLayoutChange}>{unrestrainedChildren.current}</View>
      </ScrollView>
      {!desiredWidthContainsUndefined() && (
        <View style={style}>
          <View onLayout={onLayoutChange}>{children}</View>
        </View>
      )}
    </View>
  );
}
