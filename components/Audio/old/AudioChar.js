import { useEffect, useState } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import useBook from '../../hooks/useBook';

const apiUrl = Constants.expoConfig.extra.apiUrl;

export default function AudioChar({ index, children })
{
  const { characters, translateChar } = useBook();
  const [sound, setSound] = useState();
  
  const character = characters[index].mandarin
  const code = character.codePointAt(0);
  

  useEffect(() => {
    const load = async() => {
      const saved = await translateChar(character);
      if(!saved) return;

      await createSound();
    }
    
    load();
  }, [character]);


  async function createSound()
  {
    /*
    let sound;
    const fileExists = await isSavedLocal();
    
    if(fileExists) {
      sound = await getLocalAudio();
    } else {
      const uri = apiUrl + `chars/${code}.mp3`
      const audio = await Audio.Sound.createAsync(
        { uri },
      );

      await saveAudioLocal();

      sound = audio.sound;
    }
    */
    try {
      const uri = apiUrl + `chars/${code}.mp3`
      const audio = await Audio.Sound.createAsync(
        { uri },
      );

      setSound(audio.sound);
    } catch(err) {
      console.error(err);
      setSound(null);
    }
  }

  async function getAudioLocal()
  {
    try {
      const sound = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + `${code}.mp3`,
        { encoding: 'base64' }
      );
    } catch(err) {
      console.error(err);
      return false;
    }
  }

  async function isSavedLocal()
  {
    if(Platform.OS === 'web') {
      console.log('check if file is saved locally');
    } else {
      const info = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + `${code}.mp3`
      );
      return info.exists;
    }
  }

  async function saveAudioLocal()
  {
    const apiUri = apiUrl + `chars/${code}.mp3`
    const { uri } = await FileSystem.downloadAsync(
      apiUri,
      FileSystem.documentDirectory + `${code}.mp3`
    );

    return uri;
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
    await sound.playFromPositionAsync(0);
  }

  return (
    <Button type="outline" onPress={playSound}>
      <View style={sty.contents}>
        <Icon size={15} type="antdesign" name="sound" />
        <View style={sty.text}>
          {children}
        </View>
      </View>
    </Button>
  );
}

const sty = StyleSheet.create({
  contents: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
