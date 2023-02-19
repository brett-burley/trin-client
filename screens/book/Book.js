import { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Pages from './pages/Pages'
import useBook from '../../hooks/useBook'

export default function Book({ route, navigation })
{
  const [ loaded, setLoaded ] = useState();

  const { loadBook } = useBook();
  useEffect(() => {
    async function fetchBook(id) {
      const isLoaded = await loadBook(id);
      if(isLoaded)
        setLoaded(true);
    }

    if(route.params) {
      const { id } = route.params;
      fetchBook(id);
    }
  }, [route.params]);

  if(!loaded) return <Text>Book could not load</Text>

  return (
    <View style={sty.container}>
      <Pages />
    </View>
  );
}

const sty = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
