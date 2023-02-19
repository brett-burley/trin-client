import { View, Text, StyleSheet, Platform } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import useMode from '../../hooks/useMode';
import CharacterAudio from '../Audio/CharacterAudio';

export default function Character({ c })
{
  const { modes } = useMode();

  if(modes.read) {
    return (
      <View style={sty.character}>
      <Button containerStyle={sty.btn} type="outline" disabled>
        <CharText />
      </Button>
      </View>
    );
  } else if(modes.listen) {
    return (
      <View style={sty.character}>
        <CharacterAudio mandarin={c.mandarin}>
          <CharText />
        </CharacterAudio>
      </View>
    );
  }


  function CharText() 
  {
    return (
      <View style={sty.characterText}>
        <View style={sty.chinese}>
          <Text style={sty.mandarin}>
            {c.mandarin}
          </Text>
          <Text style={sty.pinyin}>
            {c.pinyin}
          </Text>
        </View>
        <Icon 
          type="material-community"
          name="approximately-equal" 
        />
        <Text style={sty.english}>
          {c.english}
        </Text>
      </View>
    );
  }
}

const sty = StyleSheet.create({
  character: {
    minWidth: Platform.OS === 'web' ? '20%' : '30%',
    margin: 10,
  },
  characterText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chinese: {
    alignItems: 'center',
  },
  mandarin: {
    fontSize: 30,
  },
  pinyin: {
    fontSize: 15,
  },
  english: {
    fontSize: 15,
  },
});
