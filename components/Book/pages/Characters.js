import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import CharAudio from '../../../components/audio/CharAudio';
import { chineseToPinyin } from '../../../lib/pinyin/pinyin';
import { characters } from '../../../data/characters';

export default function Characters({ text, hide })
{
  console.log('Characters: ', hide);
  const result = [];
  const arr = text.split('');
  
  arr.forEach((character, index) => {
    if(index < (arr.length-1)) {
      result.push(
        <Character key={index} character={character} hide={hide} /> 
      );
    }
  })

  return result;
}


function Character({ character, hide })
{
  const [show, setShow] = useState(true)

  function onPress()
  {
    setShow(true);
    setTimeout(() => setShow(false), 8000);
  }

  return (
    <View style={{ textAlign: 'center' }}>
      <CharAudio text={character} />
      <Button onPress={onPress} color="white">
        <Text style={{ fontSize: 40 }}>
          {show ? character : '?'}
        </Text>
      </Button>
      {!hide &&
      <Text style={sty.text}>{chineseToPinyin(character)}</Text>
      }
      <Text style={sty.text}>{characters[character]}</Text>
    </View>
  ); 

}


const sty = StyleSheet.create({
  text: {
    fontSize: 35,
    marginBottom: 10,
  } 
});
