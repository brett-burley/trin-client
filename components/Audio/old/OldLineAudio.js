import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { Audio } from 'expo-av';
import useBook from '../../hooks/useBook';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.apiUrl;

export default function LineAudio({ index, children })
{
  const { translateText, sentence, lIndex } = useBook();
  const [sound, setSound] = useState();

  const line = sentence[index].chinese;
  const shouldPlay = index === lIndex;
  
  console.log(shouldPlay, index, lIndex);

  useEffect(() => {
    const load = async() => {
      if(!sound) {
        const saved = await translateText(line);
        if(!saved) return;

        await createSound();
      } else {
        if(shouldPlay)
          await playSound();
      }
    }
    
    load();
  }, [line, lIndex]);


  async function createSound()
  {
    
    const uri = apiUrl + `${line}.mp3`;
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay }
    );
      
    setSound(sound);
  }


  async function unloadSound()
  {
    await sound.unloadAsync();
  }


  async function loadSound() {
    await sound.loadAsync({ uri: `http://localhost:3000/${line}.mp3` });

  }


  async function playSound()
  {
    await sound.playAsync();
  }

  return (
    <Button buttonStyle={sty.btn} type="outline" onPress={playSound}>
      <Icon size={15} type="antdesign" name="sound" />
      <View style={sty.text}>
        {children}
      </View>
    </Button>
  );
}

const sty = StyleSheet.create({
  btn: {
    marginBottom: 5,
  },
  text: {
    width: '100%',
  },
});
