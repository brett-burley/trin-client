import { Platform, View, StyleSheet } from 'react-native';
import { Text, Icon } from '@rneui/themed';
import useBook from '../../hooks/useBook';

export default function Summary()
{
  const { getPosition } = useBook();
  const { cIndex, sIndex, lIndex } = getPosition();

  return (
    <View style={sty.summary}>
      <Text style={sty.summaryText}>
        {`C:${cIndex+1}`}
      </Text>

      <Icon size={20} color="#86939e" type="entypo" name="flow-line" />

      <Text style={sty.summaryText}>
        {`S:${sIndex+1}`}
      </Text>

      <Icon size={20} color="#86939e" type="entypo" name="flow-line" />

      <Text style={sty.summaryText}>
        {`L:${lIndex+1}`}
      </Text> 
    </View>
  );
}

const sty = StyleSheet.create({
  summary: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
  },
  summaryText: {
    fontSize: Platform.OS === 'web' ? 15 : 10,
    color: '#86939e',
  }
});
