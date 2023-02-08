/* eslint-disable react-native/no-inline-styles */
import { Table, TR, TD } from '@mackenziehnc/table';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

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
  const [someValue, setSomeValue] = useState(0);
  return (
    <View style={{ alignContent: 'center' }}>
      <Button title="increment" onPress={() => setSomeValue(someValue + 1)} />
      <Table>
        {data.map((item, index) => (
          <TR key={index}>
            <TD key={'name'}>
              <Text style={{ padding: 5 }}>{item.name}</Text>
            </TD>
            <TD key={'value'}>
              <Text style={{ padding: 10, borderWidth: 1 }}>{someValue}</Text>
            </TD>
          </TR>
        ))}
      </Table>
    </View>
  );
};

export default App;