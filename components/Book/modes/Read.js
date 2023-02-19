import React, { useEffect, useState } from 'react';
import { View, Text, Platform, StyleSheet, PixelRatio } from 'react-native';
import { Divider, Icon, Button, TabView } from '@rneui/themed';
import useMode from '../../../hooks/useMode';
import useBook from '../../../hooks/useBook';
import LineAudio from '../../Audio/LineAudio';
//import LearnCharacters from '../LearnCharacters';
import DisplayChars from '../DisplayChars';
import _ from 'lodash';


const fontScale = PixelRatio.getFontScale()


export default function Read()
{
  const { lIndex, changeLine } = useBook();

  return (
    <TabView 
      tabItemContainerStyle={sty.tabView}
      onSwipeStart={direction => swiped(direction)}
      value={lIndex}
      disableSwipe={true}
    >
      <TabView.Item>
        
      </TabView.Item>
    </TabView>
  );

  function swiped(dir)
  {
    if(dir === 'right')
      changeLine(1);
    else 
      changeLine(-1);
  }

}
/*
  return (
    <TabView 
      tabItemContainerStyle={sty.tabView}
      onSwipeStart={direction => swiped(direction)}
      value={lIndex}
      disableSwipe={true}
    >
      {tabs}
    </TabView>
  );

}

function Modes({ modes })
{
  if(modes.read)
    return <Read />
  if(modes.listen)
    return <Listen />
  else
    return <Learn />
}

function Tab()
{
  const { line } = useBook();  
  return (
    <TabView.Item style={sty.tabViewItem}>
      <LineBody line={line} i={0} />
    </TabView.Item>
  );

}

function getTabs(sentence)
{
  return sentence.map((line, i) => (
    <TabView.Item style={sty.tabViewItem} key={i}>
      <LineBody line={line} i={i} />
    </TabView.Item>
  ));

}


function LineBody({ line, i })
{
  const { chinese, pinyin, english } = line;
  const { characters } = useBook();
  
  return (
    <View style={sty.readLine}>
      <View style={sty.header}>
        <LineMandarin index={i} characters={characters} />
        <LinePinyin characters={characters} />
        <LineEnglish english={english} />
        <Divider style={sty.divider} /> 
      </View>
      
      <View style={sty.body}>
        <Body />
      </View>
    </View>
  );
}


function LineMandarin({ index, characters })
{
  const { modes } = useMode();

  const chars = characters.map((c, i) => (
    <View key={i} style={sty.singleCharacter}>
      <Text style={sty.chinese}>
        {c.mandarin}
      </Text>
    </View>
  ));

  if(modes.listen) {
    return (
      <LineAudio index={index}>
        <View style={sty.lineMandarin}>
          {chars}
        </View>
      </LineAudio>
    );
  }

  return (
    <View style={sty.lineMandarin}>
      {chars}
    </View>
  );
}


function LinePinyin({ pinyin })
{
  const { characters } = useBook();
  const chars = characters.map((c, i) => (
    <View key={i} style={sty.singleCharacter}>
      <Text style={sty.pinyin}>
        {c.pinyin}
      </Text>
    </View>
  ));


  return (
    <View style={sty.linePinyin}>
      {chars}
    </View>
  );
}


function LineEnglish({ english })
{
  return (
    <Text style={sty.english}>
      {english}
    </Text>
  );  
}

function Body()
{
  const { modes } = useMode();

  if(modes.read || modes.listen) {
    return <DisplayChars index={-1} />
  }
  return null;
}


function LineCharacters({ index })
{
  const { characters } = useBook();

  const text = characters.map((c, i) => (
    <View key={i} style={sty.lineCharacters}>
        <Text style={sty.chinese}>
          {c.mandarin}
        </Text>
        <Text style={sty.pinyin}>
          {c.pinyin}
        </Text>
        <Text>{c.english}</Text>
    </View>
  ));

  return (
    <View style={sty.mandarin}>
      <Audio index={index}>
        {text}
      </Audio>
    </View>
  );
}


function Audio({ index, children })
{
  const { listen } = useMode();
  if(!listen) return children;

  return (
    <LineAudio index={index}>
      {children}
    </LineAudio>
  );
}

const Tabers = React.memo(function myComponent({ tabs, changeLine, lIndex, sIndex })
{
  return (
    <TabView 
      tabItemContainerStyle={sty.tabView}
      onSwipeStart={direction => swiped(direction)}
      value={lIndex}
      disableSwipe={true}
    >
      {tabs}
    </TabView>
  );

  function swiped(dir)
  {
    if(dir === 'right')
      changeLine(1);
    else 
      changeLine(-1);
  }
}, areEqual);

function areEqual(prev, next) {
  return prev.lIndex === next.lIndex && prev.sIndex === next.sIndex;
}
*/

const sty = StyleSheet.create({
  tabView: {
    flex: 1,
    width: '100%',
  },
  tabViewItem: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  readLine: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    flex: 2,
    width: '90%',
    justifyContent: 'center',
  },
  body: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
  },
  lineMandarin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linePinyin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  singleCharacter: {
    flex: 1,
    alignItems: 'center',
  },
  english: {
    textAlign: 'center',
    fontSize: 40 / fontScale,
  },
  chinese: {
    flexGrow: 1,
    fontSize: 40 / fontScale,
    fontWeight: '500',
  },
  pinyin: {
    flexGrow: 1,
    fontSize: 20 / fontScale,
    fontWeight: '300',
  },
  divider: {
    width: '80%',
    marginTop: 10,
  },
});
