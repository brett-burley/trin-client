import { useEffect, useState } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

import useCharacters from '../../hooks/useCharacters';
import net from '../../lib/net/';
import Constants from 'expo-constants';


export default function CharacterAudio({ mandarin, children })
{
  const { isCommon, sendChar, saveChar } = useCharacters();
  const [audio, setAudio] = useState(false);
  const baseUri = net.apiUrl + 'static/chars/'

  useEffect(() => {
    const load = async() => {
      await createSound(mandarin); 
    }
    
    if(mandarin)
      load();

  }, [mandarin]);

  async function createSound(character)
  {
    const common = isCommon(character);
    let sound;
    if(common) {
      console.log('COMMON');
      const { code } = common;
      const res = await Audio.Sound.createAsync(common.audio);
      sound = res.sound;
    } else {
      console.log('NOT COMMON');
      const saved = await sendChar(character);
      console.log('saved', saved);
      if(saved) {
        const code = character.codePointAt(0);
        const uri = baseUri + `${code}.mp3`;
        const [ asset ] = await Asset.loadAsync(uri);
        const res = await Audio.Sound.createAsync(asset);
        sound = res.sound;
        saveChar(character, asset.localUri);
      }
    }
    
    if(sound)
      setAudio(sound);
  }

  async function unloadSound()
  {
    await audio.unloadAsync();
  }


  async function loadSound() {
    await audio.loadAsync({ uri });

  }


  async function playSound(data)
  {
    await audio.playFromPositionAsync(0);
  }
  
  return (
    <Button 
      type="outline" 
      onPress={playSound}
    >
      {children}
    </Button>
  );
}
