import { useEffect, useState } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { Audio } from 'expo-av';
import useBook from '../../hooks/useBook';
import * as FileSystem from 'expo-file-system';

const apiUri = 'http://trinityapi-env.eba-m5gmetmu.us-west-2.elasticbeanstalk.com/';
//const apiUri = 'http://localhost:3000/'

export default function CharAudio({ character, children })
{
  const { translateChar } = useBook();
  const [sound, setSound] = useState();

  const code = character.codePointAt(0);

  useEffect(() => {
    async function load()
    {
      if(character && !sound) {
        const exists = await translateChar(character); 
        setSound(true);
        console.log('exists: ', character, exists);
        if(false)
          await createSound()
      }
    }

    load();
  }, []);


  async function createSound()
  {
    const uri = apiUri + `chars/${code}.mp3`
    const { sound } = await Audio.Sound.createAsync(
      { uri }
    );
    
    setSound(sound);
  }


  async function playSound()
  {
    if(sound)
      await sound.playFromPositionAsync(0);
  }

  return (
    <Button 
      containerStyle={sty.btn}
      onPress={playSound}
      type="outline"
    >
      {children}
    </Button>
  );


}

const sty = StyleSheet.create({
  btn: {
    width: Platform.OS === 'web' ? '25%' : '40%',
    marginBottom: 15,
    marginRight: Platform.OS === 'web' ? 40 : 20,
  },
});
