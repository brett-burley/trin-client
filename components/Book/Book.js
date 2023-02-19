import { useEffect, useState } from 'react';
import { Pressable, Platform, Text, StyleSheet, View } from 'react-native';
import { Badge, Divider, Button, Icon } from '@rneui/themed';
import { setStatusBarHidden } from 'expo-status-bar';

import Read from './Read';
import Controls from './Controls';
import BottomDrawer from './BottomDrawer';
import BackBtn from '../Extras/BackBtn';

import Constants from 'expo-constants';
import useBook from '../../hooks/useBook'
import useMode from '../../hooks/useMode'
import net from '../../lib/net/';

export default function Book({ route, navigation })
{
  console.log('<Book />');
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    setStatusBarHidden(true, 'fade');
  }, []); 


  return (
    <View style={sty.book}>
      <LoadBook route={route} setLoaded={setLoaded} />
      <Body loaded={loaded} />
    </View>
  );




  function NotLoaded()
  {
    const onPress = () => navigation.navigate('library');
    return (
      <View style={sty.notLoaded}>
        <Badge
          value="Your Book could not Loaded"
          badgeStyle={sty.badge}
          status="warning"
          textStyle={sty.badgeText}
        />
        <BackBtn onPress={onPress}>
          Go Back
        </BackBtn>
      </View>
    );
  }
}


function Body({ loaded })
{
  if(!loaded) return null;
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


function LoadBook({ route, setLoaded })
{
  const { loadBook } = useBook();

  useEffect(() => {
    async function fetchBook(id) {
      const isLoaded = await loadBook(id);
      if(isLoaded)
        setLoaded(true);
    }
/*
    if(route.params) {
      const { id } = route.params;
      fetchBook(id);    
    }
*/
  fetchBook("XElYrdNdvzcE7gKPZDsX");
  }, [route.params]);

  return <></> 
}



const sty = StyleSheet.create({
  book: {
    flex: 1,
  },
  notLoaded: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pages: {
    flex: 1,
    backgroundColor: 'rgba(245, 225, 200, 0.5)',
  },
  read: {
    flex: 8,
  },
  bottom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    height: Platform.OS === 'web' ? 75 : 50,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    border: 'none',
  },
  badgeText: {
    fontSize: Platform.OS === 'web' ? 30 : 20,
    textShadow: '2px 2px 5px #bbb',
    margin: 10,
    color: '#eee',
  },
});
