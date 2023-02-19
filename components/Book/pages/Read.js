import { View, Text } from 'react-native';
import useBook from '../../../hooks/useBook';

export default function Read()
{
  const { getRead } = useBook();
  const lines = getRead();

  return lines.map((text, index) => {
    return (
      <View key={index} style={{ width: '100%', margin: 10 }}>
        <Text>{text[2]}</Text>
        <View>
          <Text>{text[0]}</Text>
          <Text>{text[1]}</Text>
        </View>
      </View>
    );
  });
   
}
