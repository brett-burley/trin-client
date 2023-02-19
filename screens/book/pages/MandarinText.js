import { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Button, Icon, } from '@rneui/themed';
import { chineseToPinyin, checkInput } from '../../../lib/pinyin/pinyin';
import Sound from '../../../components/sounds/Sound';


export default function MandarinText({ chinese, pinyin, hide, setHide })
{
  if(!chinese) return null;
  const [hideChars, setHideChars] = useState(false);

  useEffect(() => {
    setHideChars(false);
  }, [chinese]);


  return (
    <View style={sty.container}>
      
      <ChineseText hide={hideChars} data={chinese} />

      <View>
        <Pinyin show={!hide} pinyin={pinyin} />
      </View>

      {/*<PinyinInput hide={hide} pinyin={pinyin} done={done} />*/}
      
    </View>
  );

  function done()
  {
    setHide(false);
    setHideChars(true);
  }

  {/*
  function DisplayCharacters()
  {
    const result = [];
    for(let i in chinese) {
      const chinese = chinese[i];
      const pinyin = hide ? '' : pinyin;

      const element = (
        </View>
      );
      
      result.push(element);
    }

    return result;
  }
  */}
}


function ChineseText({ hide, data })
{
  if(hide) return null;
  return (
    <View style={sty.chinese}>
      <Sound data={data} />

      <Text style={sty.chineseText}>
        {data}
      </Text>
    </View>
  );

}

function Pinyin({ show, pinyin })
{
  if(!show) return null;
  return (
    <Text style={sty.pinyin}>
      {pinyin}
    </Text>
  );
}


function PinyinInput({ hide, pinyin, done })
{
  const [text, onChangeText] = useState('');
  const [display, setDisplay] = useState('');
 
  function onPress() {
    const areSame = checkInput(pinyin, text);
    if(areSame) {
      setDisplay('Right! :)');
    } else {
      setDisplay('Wrong! :(');
    }

    done();
  } 

  const wrongIcon = <Icon type='ionicon' name='warning-outline' />
  const successIcon = <Icon type='ionicon' name='checkbox-icon' />

  return (
    <View style={sty.textInput}>
      <InputBox />
      <Text>{display}</Text>
    </View>
  );

  function InputBox()
  {
    if(hide) return null;
    return (
      <View>
        <TextInput
          style={sty.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="enter pinyin"
          keyboardType="default"
        />
        
        <Button onPress={onPress} title="Check" />
      </View>
    );
  }
}


const sty = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  characters: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  chinese: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chineseText: {
    fontSize: 50,
  },
  pinyin: {
    fontSize: 30,
  },
  textInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  chipTitle: {
    color: 'white'
  },
  text: {
    width: '100%',
    textAlign: 'center',
    
  },
});
