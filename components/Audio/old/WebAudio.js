import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Icon } from "@rneui/themed";
import ReactAudioPlayer from 'react-audio-player';

export default function WebAudio()
{

  const [source, setSource] = useState('');
  
  useEffect(() => {
    const audio = new Audio(localStorage.getItem('audio'));
    
    setSource(audio);
  }, [])

  if(!source) return null;

  return (
    <View>
      <Button type="solid">
        <Icon name="home" color="white" />
      </Button>
      <audio controls>
        <source src="horse.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </View>
  );
}
