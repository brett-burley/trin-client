import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

import useBook from '../../hooks/useBook'; 

export default function Audio({ text }) {
  const [sound, setSound] = useState();
  const { sendText } = useBook();

  useEffect(() => {
    if(text)
      sendText(text);
  }, [text]);

  if(!sound) return null; 
  
  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync( 
      { uri: 'http://localhost:5555/static/audio.mp3' },
      { shouldPlay: true }
    );
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();}
      : undefined;
  }, [sound]);

  return (
    <View style={sty.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

const sty = StyleSheet.create({
  container: {},
});
