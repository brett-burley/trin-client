import { useEffect, useState } from 'react';
import { useWindowDimensions, Platform, View, StyleSheet } from 'react-native';
import { Text, TabView, Button, Icon } from '@rneui/themed';
import useBook from '../../hooks/useBook';
import AudioCharacters from './AudioCharacters';


export default function WebBody({ tabs, audio, show, setShow })
{
  const { lIndex } = useBook();


  useEffect(() => {
    setTimeout(() => setShow(false), 4000);
  }, [lIndex]);


  function Body()
  {
    if(show) return tabs[lIndex]
    return <AudioCharacters />
  }

  return (
    <View style={sty.webBody}>
      <TabView 
        tabItemContainerStyle={sty.tab}
        value={lIndex}
      >
        <Body />
      </TabView>

      {/*audio[lIndex]*/}
      <Controls />
    </View>
  );
}


function Controls()
{
  const { changeLine, getPosition } = useBook();
  const { sStart, sEnd } = getPosition();

  return (
    <View style={sty.controls}>
      <Button 
        onPress={() => changeLine(-1)}
        size="lg"
        type="outline"
      >
        <Icon size={30} type="antdesign" name="left" />
      </Button>
      
      <Button 
        onPress={() => changeLine(1)}
        size="lg"
        type="outline"
      >
        <Icon size={30} type="antdesign" name="right"  />
      </Button>
    </View>
  );
}


function DisplaySentence({ line, i })
{
  const { chinese, english, pinyin } = line;
  const { fontScale } = useWindowDimensions();

  const styles = StyleSheet.create({
    english: {
      fontSize: 50 / fontScale,
    },
    chinese: {
      fontSize: 60 / fontScale,
      textAlign: 'center',
    },
    pinyin: {
      fontSize: 35 / fontScale,
      fontWeight: '500',
      textAlign: 'center',
    },
  });

  return (
    <View style={sty.text}>
      <Text style={styles.english}>
        {english}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Characters chinese={chinese} pinyin={pinyin} styles={styles} />
      </View>
      {/*<LineAudio line={chinese} index={i} />*/}
    </View>
  );
}

function Characters({ chinese, pinyin, styles })
{
  const cChars = chinese.split('');
  const pChars = pinyin.split(' ');
  const cLength = cChars.length;
  const pLength = pChars.length;
  const length = cLength <= pLength ? cLength : pLength;

  const result = [];
  for(let i = 0; i < length; i++) {
    const chinese = cChars[i];
    const pinyin = pChars[i];

    result.push(
      <View key={i}>
        <Text style={styles.chinese}>
          {chinese}
        </Text>
        <Text style={styles.pinyin}>
          {pinyin}
        </Text>
      </View>
    );
  }

  return result;
}


const sty = StyleSheet.create({
  webBody: {
    flex: 1,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: '48%',
    flexDirection: 'row',
  },
  text: {
    minWidth: '50%',
    textAlign: 'center'
  }
});
