import { useEffect, useState } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import useBook from '../../hooks/useBook';
import useLine from '../../hooks/useLine';
import net from '../../lib/net/';
import storage from '../../lib/storage/storage';
import * as FileSystem from 'expo-file-system';
import { removePunc } from '../../lib/text/typography';
import Constants from 'expo-constants';
import md5 from 'md5';
import base64 from 'base-64';


export default function LineAudio({ text, children })
{
  const { sendLine, isLocal, saveLine } = useLine();
  const [audio, setAudio] = useState();

  const baseUri = net.apiUrl + 'static/users/'
  const mandarin = removePunc(text);

  useEffect(() => {
    const load = async() => {
      if(mandarin) {
        if(audio)
          await unloadSound();
        
        const local = isLocal(mandarin);
        console.log(local);
        if(local)
          await loadAudio(mandarin);
        else
          await createAudio(mandarin);
      }
    }

    load();
  }, [mandarin]);



  async function createAudio(line)
  {
    try {
      console.log('createAudio');
      const path = await sendLine(mandarin);
      const apiUri = baseUri + path;

      const [ asset ] = await Asset.loadAsync(apiUri);
      const { sound } = await Audio.Sound.createAsync(asset);

      await sound.playAsync();
      setAudio(sound);

      const { localUri } = await asset.downloadAsync(); 
      saveLine(line, localUri);
    } catch(e) {
      console.error(e);
      return null;
    }
  }

  async function loadAudio(uri) {
    try {
      console.log('loadAudio');
      const [ asset ] = await Asset.loadAsync(uri);
      const { sound } = await Audio.Sound.createAsync(asset);

      await sound.playAsync();
      setAudio(sound);
    } catch(e) {
      console.error(e);
      return null;
    } 
  }


  async function playSound()
  {
    await audio.playFromPositionAsync(0);
  }


  async function unloadSound()
  {
    await audio.unloadAsync();
  }


  return (
    <Button containerStyle={sty.btn} type="outline" onPress={playSound}>
      {children}
    </Button>
  );
}

const sty = StyleSheet.create({
  btn: {
    width: '90%',
    marginBottom: 10,
  },
});
