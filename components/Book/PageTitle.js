import { View, Text, StyleSheet, Platform, PixelRatio } from 'react-native';
import { Divider } from '@rneui/themed';
import useMode from '../../hooks/useMode';
import useBook from '../../hooks/useBook';
import LineAudio from '../Audio/LineAudio';

const fontScale = PixelRatio.getFontScale()


export default function PageTitle()
{
  return (
    <View style={sty.header}>
      <LineEnglish />
      <LineChinese />
      <Divider style={sty.divider} /> 
    </View>
  );
}


function LineChinese()
{
  const { line, characters } = useBook();
  const { modes } = useMode();
  const styles = getStyles();

  const chars = characters.map((c, i) => (
    <View key={i} style={sty.singleCharacter}>
      <Text style={styles.mandarin}>
        {c.mandarin}
      </Text>

      <Text style={styles.pinyin}>
        {c.pinyin}
      </Text>
    </View>
  ));


  if(modes.read) {
    return (
      <View style={sty.lineChinese}>
        {chars}
      </View>
    );
  } else if(modes.listen) {
    return (
      <View style={sty.lineChinese}>
        <LineAudio text={line.chinese}>
          {chars}
        </LineAudio>
      </View>
    )
  } else {
    return <Text>Learn Line Chinese</Text>
  }


  function getStyles()
  {
    const length = characters.length;
    const fontSizeM = 40 - (5 * (length / 10)); 
    const fontSizeP = 30 - (10 * (length / 10)); 


    const mandarin = {
      flexGrow: 1,
      fontSize: fontSizeM, 
      fontWeight: '500',
    };

    const pinyin = {
      flexGrow: 1,
      fontSize: fontSizeP,
      fontWeight: '300',
    };

    return { mandarin, pinyin };
  }
}


function LineEnglish()
{
  const { line } = useBook();
  const english = line.english;

  const length = english.length;
  const fontSize = 30 - (2 * (length / 10)); 
  const style = {
    textAlign: 'center',
    fontSize
  };

  return (
    <Text style={style}>
      {english}
    </Text>
  );  
}

const sty = StyleSheet.create({
  header: {
    flex: 1,
  },
  lineChinese: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  linePinyin: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  singleCharacter: {
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2,
  },
  chinese: {
    width: '100%',
  },
  mandarin: {
    flexGrow: 1,
    fontSize: 40 / fontScale,
    fontWeight: '500',
  },
  pinyin: {
    flexGrow: 1,
    fontSize: 20 / fontScale,
    fontWeight: '300',
  },
  divider: {
    width: '90%',
  },
});
