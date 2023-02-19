import { useEffect } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Divider, Button, Icon } from '@rneui/themed';

import Read from './modes/Read';
import Controls from './Controls';
import BottomDrawer from './BottomDrawer';

export default function Pages()
{
  console.log('<Pages />');

  return (
    <View style={sty.pages}>
      <View style={sty.read}>
        <Read />
      </View>

      <Divider />

      <View style={sty.bottom}>
        <Controls>
          <BottomDrawer />
        </Controls>
      </View>
    </View>
  );
}





const sty = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: 'rgba(245, 225, 200, 0.5)',
  },
  read: {
    flex: 6,
  },
  bottom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    height: '100%',
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  summaryText: {
    fontSize: 12,
    color: '#86939e',
  },
  divider: {
    margin: 3,
  },
});
