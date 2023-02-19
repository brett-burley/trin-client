import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import useBook from '../../hooks/useBook';
import Character from './Character';

export default function PageBody()
{
  return (
    <ScrollView contentContainerstyle={sty.pageBody}>
      <Characters />
    </ScrollView>
  );
}


function Characters()
{
  const { characters } = useBook();

  const allCharacters = characters.map((c, i) => (
    <Character key={i} c={c} />
  ));

  return (
    <View style={sty.characters}>
      {allCharacters}
    </View>
  );
}


const sty = StyleSheet.create({
  pageBody: {
    flex: 1,
  },
  characters: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
