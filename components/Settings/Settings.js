import { View, StyleSheet } from 'react-native';
import { Switch, Text } from '@rneui/themed';
import useBook from '../../hooks/useBook';

export default function Settings()
{
  const { listenMode, flipListenMode } = useBook();
  console.log(listenMode);
  return (
    <View style={sty.settings}>
      <Text>Modes</Text>
      <View style={sty.mode}>
        <Text>ListenMode: </Text>
        <Switch
          value={listenMode}
          onValueChange={() => flipListenMode()}
        />
      </View>
    </View>
  );
}

const sty = StyleSheet.create({
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mode: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
