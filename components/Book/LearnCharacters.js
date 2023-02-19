import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge, withBadge, Icon, Chip, Card, Button, Input, Text, ButtonGroup } from '@rneui/themed';

import AudioChar from '../Audio/AudioChar';
import useBook from '../../hooks/useBook';
import DisplayChars from './DisplayChars';
import { translations } from '../../assets/chars/characters';
import { tones } from '../../assets/chars/tones';
import { isVowel, isPunctuation } from '../../lib/text/typography';

export default function LearnCharacters()
{
  const [index, setIndex] = useState(0);

  return (
    <View style={sty.learnCharacters}>
      <Learn index={index} next={() => setIndex(index+1)}/>

      <View style={sty.display}>
        <DisplayChars index={index} />
      </View>
    </View>
  );
}


function Learn({ index, next })
{
  const { characters, learnMode } = useBook();
  if(!learnMode || index >= characters.length)
    return null;

  const text = characters[index];
  return (
    <View style={sty.learn}>
      <CharLine text={text} next={next} />
    </View>
  );
}


function CharLine({ text, next })
{
  const [typed, setTyped] = useState(false);
  
  if(!typed)
    return <TypeLine text={text} next={() => onPress('typed')} />
  else
    return <WriteLine text={text} next={() => onPress()} />


  function Audio()
  {
    let show = false;
    if(typed)
      show = 'flash';
    if(done)
      show = 'show'

    return <AudioChar character={text.mandarin} play={play} show={show} />
  }


  function onPress(type)
  {
    if(type === 'typed') {
      setTyped(true);
    } else {
      setTyped(false);
      next();
    }
  }
}


function TypeLine({ text, next })
{
  const { pinyin, english } = text;


  return (
    <View style={sty.typeLine}>
      <Text style={sty.title}>
        Type it
      </Text>
      
      <Card containerStyle={sty.card}>
        <Card.Title style={sty.cardTitle}>
          {english}
        </Card.Title>
        
        <InputSection pinyin={pinyin} next={next} />      

        <Button 
          onPress={next}
          buttonStyle={sty.btn}
          type="outline"
          color="secondary"
        >
          skip
          <Icon 
            type="ionicon" 
            name="play-skip-forward-outline" 
            size={20}
          />
        </Button> 
      </Card>
    </View>
  );
}



function InputSection({ pinyin, next })
{
  const input = useRef();
  const [vowel, setVowel] = useState(null);
  const [done, setDone] = useState(false);

  return (
    <View style={sty.pinyinInput}>
      <View style={sty.inputRow}>
        <PinyinInput input={input} check={check} />
        <StatusIcon done={done} />
      </View>
      <ToneKeyboard vowel={vowel} setPinyin={setPinyin} />
    </View>
  );


  function setPinyin(value)
  {
    const text = input.current.input.value;
    const pinyin = text.slice(0, text.length-1) + value;

    input.current.input.value = pinyin;

    setVowel(null);

    if(pinyin === input.current.input.value) {
      console.log('SAME: ', pinyin, input.current.input.value);
      setDone(true);
      setTimeout(() => next(), 1000);
    }
  }

  
  function check(value)
  {
    const end = value.length - 1;
    const c = value.charAt(end);
    
    if(isVowel(c)) {
      setVowel(c);
    } else {
      setVowel(null);
    }
    
    if(pinyin === input.current.input.value) {
      setDone(true);
      setTimeout(() => next(), 1000);
    }
  }
}



function PinyinInput({ input, check })
{
  return (
      <Input
        ref={input}
        placeholder="enter pinyin"
        onChangeText={value => check(value)}
        containerStyle={sty.input}
      />
  );
}



function ToneKeyboard({ vowel, setPinyin })
{
  let buttons = ['-', '-', '-', '-'];
  if(vowel)
    buttons = tones[vowel];


  return (
    <Card>
      <ButtonGroup
        buttons={buttons}
        selectMultiple
        onPress={(index) => {
          setPinyin(buttons[index])
        }}
      />
    </Card>
  );
}



function StatusIcon({ done })
{
  if(!done) {
    return (
      <Icon 
        type="font-awesome" 
        name="exclamation-triangle" 
        color="#faad14"
        size={20}
        reverse
        containerStyle={{ padding: 3 }}
      />
    );
  } else {
    return (
      <Icon 
        type="feather" 
        name="check-circle" 
        color="#52c41a"
        size={20}
        reverse
        containerStyle={{ padding: 3 }}
      />   
    );
  }
}



function TextLine({ text }) {
  const { english, pinyin } = text;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={sty.pinyin}>{pinyin}</Text>
      <Text style={sty.english}>{english}</Text>
    </View>
  );
}


function WriteLine({ text, next })
{
  const { mandarin, pinyin, english } = text; 

  return (
    <View style={sty.writeLine}>
      <Text style={sty.title}>
        Type it
      </Text>

      <Card containerStyle={sty.card}>
        <View style={sty.writeContent}>
          <AudioChar character={mandarin} play={false} show="flash" />
          <Text style={sty.pinyin}>
            {pinyin}
          </Text>
          <Text style={sty.cardTitle}>
            {english}
          </Text>
          <Button 
            color="success"
            onPress={next}
          >
            next
          </Button>
        </View>
      </Card>
    </View>
  );
}





function Character({ c })
{
  const { listenMode } = useBook();
 
  if(listenMode)
    return <AudioChar character={c} /> 

  return <CharacterText c={c} />;
}


const sty = StyleSheet.create({
  learnCharacters: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learn: {
    flexDirection: 'row',
    flex: 3,
  },
  display: {
    flexDirection: 'row',
    flex: 2,
    width: '100%',
    padding: 10,
  },
  typeLine: {
    flexGrow: 1,
    alignItems: 'center',
  },
  writeLine: {
    flexGrow: 1,
    alignItems: 'center',
  },
  writeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  card: {
    width: '100%',
  },
  cardTitle: {
    fontStyle: 'italic',
    fontSize: 25,
  },
  pinyinInput: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
  },
  input: {
    maxWidth: '80%',
  },
  btn: {
  },
  chinese: {
    fontSize: 40,
  },
  pinyin: {
    fontSize: 30,
  },
  title: {
    fontSize: 40
  },
  character: {
    fontSize: 16,
    fontWeight: 500,
  },
  inputText: {
    fontSize: 20
  }
});
