import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as mandarinToPinyin from 'chinese-to-pinyin';
import { ButtonGroup, Card, Input, Button } from '@rneui/themed';
import LearnCharacters from './LearnCharacters';
import DisplayChars from './DisplayChars';
import AudioChar from '../Audio/AudioChar';
import useBook from '../../hooks/useBook';
import { translations } from '../../assets/chars/characters';
import { tones } from '../../assets/chars/tones';
import { chineseToPinyin } from '../../lib/pinyin/pinyin';


export default function ChineseChars({ show })
{
  if(!show) return null;
  const { line, chars } = useBook();
  
  return (
    <View style={sty.charForChar}>
      <Display />  
    </View>
  );
}


function Display()
{
  const { learnMode } = useBook();

  if(learnMode)
    return <LearnCharacters />

  return <DisplayChars index={-1} /> 
}


function CharacterText({ c })
{
  if(isPunctuation(c))
    return (
      <Text style={sty.chinese}>
        {c}
      </Text>
    );
  else
    return (
      <View>
        <Text style={sty.chinese}>{c}</Text>
        <Text style={sty.pinyin}>
          {chineseToPinyin(c)}
        </Text>
        <Text style={sty.character}>
          {translations[c]}
        </Text>
      </View>
    );
}

/*
function LearnCharacters({ chars })
{
  const { line, lIndex } = useBook();
  const { english } = line;

  console.log('LearnCharacters: ', chars, line, english);

  return (
    <View style={{ flex: 1 }}>
      <Text style={sty.english}>
        {english}
      </Text>

      <CharForChar />
    </View>
  );

  function CharForChar()
  {
    const [index, setIndex] = useState(1);

    const result = [];
    for(let i = 0; i < index; i++) {
      const text = getText(i);
      const next = () => setIndex((p) => p+1);


      result.push(
        <CharLine key={i} text={text} next={next} play={(index-1) === i} />
      );
    }


    function getText(i)
    {
      const mandarin = chars[i];
      const pinyin = mandarinToPinyin(mandarin);
      const english = translations[mandarin];

      return { mandarin, pinyin, english };
    }

    return (
      <View style={{ height: '80%', width: '100%' }}>
        {result}
      </View>
    );
  }
}

*/

function CharLine({ text, next, play })
{
  const [typed, setTyped] = useState(false);
  const [done, setDone] = useState(false);


  let body = null;
  if(!typed)
    body = <TypeLine text={text} next={() => setTyped(true)} />
  else if(typed)
    body = <WriteLine text={text} next={() => setDone(true)} />

  if(done)
    body = <TextLine text={text} />


  return (
    <View style={{ flexDirection: "row", alignItems: 'center' }}>
      {body}
    </View>
  );

  function Audio()
  {
    let show = false;
    if(typed)
      show = 'flash';
    if(done)
      show = 'show'

    return <AudioChar character={text.mandarin} play={play} show={show} />
  }

}







function isVowel(c)
{
  const regex = /[aeiou]/g;
  const match = c.match(regex);

  return match ? true : false;
}

function isPunctuation(c)
{
  const regex = /[。，]/g;
  const match = c.match(regex);

  return match ? true : false;
}


const sty = StyleSheet.create({
  charForChar: {
    flex: 1,
  },
  translatedChars: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  characters: {
    textAlign: 'center',
    margin: 5,
  },
  chinese: {
    fontSize: 40,
  },
  pinyin: {
    fontSize: 30,
  },
  english: {
    fontSize: 30
  },
  character: {
    fontSize: 16,
    fontWeight: 500,
  },
  inputText: {
    fontSize: 20
  }
});
