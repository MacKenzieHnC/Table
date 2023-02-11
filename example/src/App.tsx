/* eslint-disable react-native/no-inline-styles */
import { Table, TD, TR } from '@mackenziehnc/table';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import CellViewNativeComponent from '../../src/CellViewNativeComponent';

const App = () => {
  const data = [
    {
      name: 'I am some data!',
      value:
        'Two households, both alike in dignity, in fair Verona, where we lay our scene, from ancient grudge break to new mutiny, where civil blood makes civil hands unclean.',
    },
    {
      name: "I'm data too!",
      value:
        "From forth the fatal loins of these two foes, a pair of star-cross'd lovers take their life; whose misadventured piteous overthrows do with their death bury their parents' strife.",
    },
    {
      name: 'I am also some data!',
      value:
        "The fearful passage of their death-mark'd love, and the continuance of their parents' rage, which, but their children's end, nought could remove, is now the two hours' traffic of our stage; the which if you with patient ears attend, what here shall miss, our toil shall strive to mend.",
    },
  ];
  const [someValue, setSomeValue] = useState(1);
  const rainbow = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
  ];
  return (
    <View style={{ backgroundColor: '#333', flex: 1 }}>
      <Button title="increment" onPress={() => setSomeValue(someValue * 10)} />
      <Table>
        {data.map((item, index) => (
          <TR key={index}>
            <TD key={'name'}>
              <View style={{ flexDirection: 'row', flexShrink: 1 }}>
                <Text
                  style={{
                    flexShrink: 1,
                    color: 'white',
                    borderColor: 'white',
                    borderWidth: 1,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TD>
            <TD key={'number'}>
              <Text
                style={{
                  flexShrink: 1,
                  color: 'white',
                  borderColor: 'white',
                  borderWidth: 1,
                }}
              >
                {someValue}
              </Text>
            </TD>
            <TD key={'value'}>
              <Text
                style={{
                  flexShrink: 1,
                  color: 'white',
                  borderColor: 'white',
                  borderWidth: 1,
                }}
              >
                {item.value}
              </Text>
            </TD>
          </TR>
        ))}
      </Table>
    </View>

    // <View>
    //   <Button title="increment" onPress={() => setSomeValue(someValue * 10)} />
    //   <Table>
    //     {data.map((item, index) => (
    //       <TR key={index}>
    //         <TD key={'name'}>
    //           <View
    //             style={{
    //               height: 50,
    //               width: 50,
    //               backgroundColor: rainbow[index * 2],
    //             }}
    //           />
    //         </TD>
    //         <TD key={'value'}>
    //           <View
    //             style={{
    //               height: 50,
    //               width: 50,
    //               backgroundColor: rainbow[index * 2 + 1],
    //             }}
    //           />
    //         </TD>
    //       </TR>
    //     ))}
    //   </Table>
    // </View>
  );
};

export default App;
