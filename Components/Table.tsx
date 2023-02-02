/* eslint-disable react-native/no-inline-styles */
import React, {cloneElement, useState} from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  Text,
  View,
  ViewStyle,
} from 'react-native';

/**
 * A single cell
 */
interface ITD {
  children?: any;
  requestWidth?: Function;
  desiredWidthIsDefined?: Function;
  getWidth?: Function;
}
export const TD: React.FC<ITD> = ({
  children,
  requestWidth,
  desiredWidthIsDefined,
  getWidth,
}: ITD) => {
  const onLayout = (event: LayoutChangeEvent) => {
    if (requestWidth && desiredWidthIsDefined && !desiredWidthIsDefined()) {
      requestWidth(Math.ceil(event.nativeEvent.layout.width));
    }
  };
  if (!getWidth) {
    return <Text>Uh-oh!</Text>;
  }
  return (
    <View onLayout={onLayout} style={{width: getWidth()}}>
      {children}
    </View>
  );
};

/**
 * Row
 */
interface ITR {
  children: React.ReactElement<ITD>[] | React.ReactElement<ITD>;
}
export const TR: React.FC<ITR> = ({children}: ITR) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'nowrap',
      }}>
      {children}
    </View>
  );
};

/**
 * Table
 */
interface ITable {
  children: React.ReactElement<ITR>[] | React.ReactElement<ITR>;
  style?: ViewStyle;
  priviledgedColumns?: number[];
}
export const Table: React.FC<ITable> = ({
  children,
  style,
  priviledgedColumns = [],
}: ITable) => {
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
            'All rows in Table need to have the same number of columns!',
          );
        }
      } else if (rowIndex !== 0 && size[1] !== 1) {
        throw Error(
          'All rows in Table need to have the same number of columns!',
        );
      }
    });
  }

  const [scrollViewWidth, setScrollViewWidth] = useState(1000);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const [desiredWidth, setDesiredWidth] = useState(
    Array.from(Array(size[0]), () => new Array(size[1])),
  );
  const [colWidth, setColWidth] = useState(Array(size[1]));
  if (!desiredWidth || !colWidth) {
    return <Text>Loading</Text>;
  }

  const getDesiredMax = (colIndex: number) => {
    const max = Math.max(
      ...desiredWidth.map(desiredWidthRow => desiredWidthRow[colIndex]),
    );
    return max;
  };

  const desiredWidthContainsUndefined = () => {
    for (let row = 0; row < desiredWidth.length; row++) {
      for (let col = 0; col < desiredWidth[row].length; col++) {
        if (!desiredWidth[row][col]) {
          return true;
        }
      }
    }
    return false;
  };

  const onLayoutChange = (event: LayoutChangeEvent) => {
    // Make ScrollView as big as it needs to be
    if (
      isMeasuring &&
      scrollViewWidth - event.nativeEvent.layout.width <= 1000
    ) {
      setScrollViewWidth(scrollViewWidth * 2);
    }
    // Calculate column sizes
    else {
      let remainingWidth = event.nativeEvent.layout.width;
      let updatedColWidth = [...colWidth];
      let remainingCols = Array.from(
        Array<number[]>(size[1]),
        (cell, index) => {
          return index;
        },
      );

      // Ignore priviledge columns
      priviledgedColumns.forEach(col => {
        const width = getDesiredMax(col);
        updatedColWidth[col] = width;
        remainingWidth -= width;
        remainingCols = remainingCols.filter(x => x !== col);
      });

      // Divide remaining space fairly
      remainingCols.forEach(col => {
        console.log('starting column ' + col);
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
        remainingCols = remainingCols.filter(x => x !== col);
      });

      setColWidth(updatedColWidth);
    }
  };

  // Add necessary functions to cells
  if (Array.isArray(children)) {
    (children as React.ReactElement<ITR>[]).forEach((row, rowIndex) => {
      if (Array.isArray(row.props.children)) {
        let newCells: React.ReactElement[] = [];
        row.props.children.forEach((cell, colIndex) => {
          newCells.push(
            cloneElement(
              cell,
              {
                requestWidth: (width: number) => {
                  let newArr = [...desiredWidth];
                  newArr[rowIndex][colIndex] = width;
                  setDesiredWidth(newArr);
                },
                desiredWidthIsDefined: () => {
                  return desiredWidth[rowIndex][colIndex] !== undefined;
                },
                getWidth: () => {
                  return colWidth[colIndex];
                },
              },
              cell.props.children,
            ),
          );
        });
        children[rowIndex] = cloneElement(row, {}, newCells);
      }
    });
  }

  if (isMeasuring) {
    if (!desiredWidthContainsUndefined()) {
      setIsMeasuring(false);
    }
    return (
      <View>
        <Text>{desiredWidthContainsUndefined().toString()}</Text>
        <Text>__Desired Width__</Text>
        {desiredWidth.map(row => (
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {row.map(cell => (
              <Text style={{padding: 10}}>{Math.floor(cell * 10) / 10}</Text>
            ))}
          </View>
        ))}
        <ScrollView
          contentContainerStyle={{
            width: scrollViewWidth,
            alignItems: 'flex-start',
          }}>
          <View onLayout={onLayoutChange}>{children}</View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={style}>
      <View onLayout={onLayoutChange}>{children}</View>
    </View>
  );
};
