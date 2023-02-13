import * as React from 'react';

import { Text, View } from 'react-native';
import { TableView } from '@mackenziehnc/table';

export default function App() {
  const data = ['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4', 'Cell 5', 'Cell 6'];
  return (
    <View style={{ width: 200, borderWidth: 3, borderColor: 'red' }}>
      <TableView>
        {data.map((child, index) => (
          <View
            key={index}
            style={{ borderWidth: 1, flexShrink: 1, flexDirection: 'row' }}
          >
            <Text style={{ flexShrink: 1, borderWidth: 1 }}>{child}</Text>
          </View>
        ))}
      </TableView>
    </View>
  );
}
