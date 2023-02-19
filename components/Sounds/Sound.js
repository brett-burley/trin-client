import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import useBook from '../../hooks/useBook';

export default function Sound({ data })
{
  const { listenMode, translateText } = useBook();
  const [text, setText] = useState('');
  const [sound, setSound] = useState();
  const playbackObject = new Audio.Sound();


  useEffect(() => {
    const load = async() => {
      if(data !== text && listenMode) {
        const saved = await translateText(data);
        if(!saved) return;

        if(!sound) {
          await createSound(data);
        
        } else {
          await unloadSound();
          await loadSound();
          await playSound();
        }
        setText(data);
      }
    }
    
    load();
  }, [data, listenMode]);


  async function createSound(data)
  {
      const { sound } = await Audio.Sound.createAsync(
        { uri: `http://localhost:5555/static/${data}.mp3` },
        { shouldPlay: true }
      );

      setSound(sound)
  }

  async function unloadSound()
  {
    console.log('unloadSound()');
    await sound.unloadAsync();
  }


  async function loadSound() {
    await sound.loadAsync({ uri: `http://localhost:5555/static/${data}.mp3` });

  }

  async function playSound()
  {
    await sound.playAsync();
  }

  console.log('sound: ', sound);
  console.log('listenMode: ', listenMode);
  if(!sound || !listenMode) return null

  return (
    <View>
      <Text>Line Audio Removed</Text>
    </View>
  );
}
