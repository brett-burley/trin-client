import { View, Text, StyleSheet } from 'react-native';
import {  TabView } from '@rneui/themed';
import useBook from '../../hooks/useBook';

import PageTitle from './PageTitle';
import PageBody from './PageBody';


export default function Read()
{
  const { lIndex, changeLine } = useBook();
  console.log('<Read />', lIndex);

  return (
    <TabView
      containerStyle={sty.tabView}
      onSwipeStart={direction => swiped(direction)}
    >
      <TabPages />
    </TabView>
  );


  function swiped(dir)
  {
    const value = dir === 'right' ? 1 : -1;
    changeLine(value);
  }
}


function TabPages()
{
  return (
    <TabView.Item style={sty.tabViewItem}> 
      <View style={sty.tabPage}>
        <View style={sty.tabTitle}>
          <PageTitle />
        </View>
        <View style={sty.tabBody}>
          <PageBody />
        </View>
      </View>
    </TabView.Item>
  );
}


const sty = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  tabViewItem: {
    width: '100%',
    height: '100%',
  },
  tabPage: {
    flex: 1,
  },
  tabTitle: {
    flex: 2,
  },
  tabBody: {
    flex: 5,
  },
});
