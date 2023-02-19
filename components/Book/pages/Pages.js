import { useEffect, useState, useRef } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import _ from 'lodash';
import useBook from '../../../hooks/useBook';
import usePage from '../../../hooks/usePage';
import MandarinText from './MandarinText';
import Pinyin from './Pinyin';
import Sound from '../../../components/sounds/Sound';
import LineAudio from '../../../components/audio/LineAudio';
import Characters from './Characters';
import Controls from './Controls';
import BottomDrawer from '../../../components/layout/BottomDrawer';
import Read from './Read';


export default function Pages()
{
  const { line, translateText, getRead } = useBook();
  const [hide, setHide] = useState(false); 
 
  if(_.isEmpty(line)) return null;
  
  const { chinese, pinyin, english } = line;
  

  return (
    <View style={sty.container}>
      <PageBody />

      <View style={sty.bottom}>
        <Controls />
        
        <View style={{ display: 'absolute', bottom: 0, right: 0 }}>
          <BottomDrawer />
        </View>
      </View>
  </View>
  );
}


function PageBody()
{
  const { mode } = usePage();
  
  const page = mode === 'listen' ? <Text>Listen</Text> : <Read />

  return (
      <View style={sty.body}>
        { page }      
      </View>
  );
}


function Listen()
{
  return (
    <View style={sty.allText}>
      <Text style={sty.english}>
        {english}
      </Text>

      <MandarinText chinese={chinese} pinyin={pinyin} hide={hide} setHide={setHide} />    
          

      <View style={sty.audio}>
        <View style={sty.characters}>
          <Characters text={chinese} hide={hide} />
        </View>
      </View>
    </View>
  );
}


const sty = StyleSheet.create({
  container: {
    width: Platform.OS === 'web' ? '70%' : '95%',
    height: '95%',
    backgroundColor: 'rgba(245, 225, 200, 0.5)',
    padding: 20,
  },
  body: { 
    height: '85%',
    textAlign: 'center'
  },
  bottom: {
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  controls: {
    flexGrow: 2
  },
  allText: {
    height: '50%'
  }, 
  audio: {
    width: '100%',
    height: '25%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  characters: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  block: {
    width: '75%',
  },
  english: {
    fontSize: 50,
    textAlign: 'center',
  }
});
