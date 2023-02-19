import { Platform, ScrollView, Text, StyleSheet, View } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import AudioChar from '../Audio/AudioChar';
import useMode from '../../hooks/useMode';
import useBook from '../../hooks/useBook';
import { translations } from '../../assets/chars/characters';
import { tones } from '../../assets/chars/tones';
import { chineseToPinyin } from '../../lib/pinyin/pinyin';
import { isVowel, isPunctuation } from '../../lib/text/typography';


export default function DisplayChars({ index })
{
  const { characters } = useBook();
  const display = getChars();
  
  return (
      <View style={sty.displayChars}>
        {display}
      </View>
  ); 

  function getChars()
  {
    const end = index > -1 ? index : characters.length;
    const displayChars = characters.slice(0, end);

    return displayChars.map((c, i) => (
      <View key={c.mandarin} style={sty.contents}>
        <Mandarin index={i} c={c.mandarin} />
      </View>
    ));
  }
}


function Mandarin({ index, c })
{
  const { modes } = useMode();

  if(modes.learn || modes.read)
    return <CharacterText c={c} />

  return (
    <AudioChar index={index}>
      <CharacterText c={c} />
    </AudioChar>
  );
}


function CharacterText({ c })
{
  if(isPunctuation(c))
    return (
      <View style={sty.characters}>
        <Text style={sty.mandarin}>
          {c}
        </Text>
      </View>
    );
  else
    return (
      <View style={sty.characters}>
        <View style={sty.characterText}>
          <View style={sty.chinese}>
            <Text style={sty.mandarin}>
              {c}
            </Text>
            <Text style={sty.pinyin}>
              {chineseToPinyin(c)}
            </Text>
          </View>
          <Icon 
            type="material-community"
            name="approximately-equal" 
          />
          <Text style={sty.english}>
            {translations[c]}
          </Text>
        </View>
      </View>
    );
}

function Audio({ c, children })
{
  return (
    <CharAudio character={c}>
      {children}
    </CharAudio>
  );
}

const sty = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  displayChars: {
    flexGrow: 1,
    flexBasis: '100%',
    flexWrap: 'wrap',
  },
  contents: {
    padding: 5,
  },
  characters: {
    minWidth: '50%',
  },
  characterText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '20%',
  },
  chinese: {
    alignItems: 'center',
  },
  mandarin: {
    fontSize: Platform.OS === 'web' ? 40 : 30,
  },
  pinyin: {
    fontSize: Platform.OS === 'web' ? 20 : 15,
  },
  english: {
    fontSize: Platform.OS === 'web' ? 20 : 15,
  },
  character: {
    fontSize: 16,
    fontWeight: 500,
  },

});
