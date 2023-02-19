import { useEffect, useState } from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native';
//import Books from './Books';
import useLibrary from '../../hooks/useLibrary';

export default function Library({ navigation })
{
  const { getTitles } = useLibrary();
  const titles = getTitles();
  {/*
  useEffect(() => {

    navigation.navigate('Book', { id: 'XElYrdNdvzcE7gKPZDsX' });
  }, [])
  */}
  return (
    <View style={{ height: '100%'}}>
      <Text style={sty.title}>Your Books</Text>
      <View style={sty.container}>
        <LibraryContainer>
          <Books titles={titles} navigate={gotoBook} />
        </LibraryContainer>
      </View>
    </View>
  );
  
  function gotoBook(id)
  {
    navigation.navigate('Book', { id });
  }
}

function LibraryContainer({ children })
{
  return (
    <View style={sty.libContainer}>
      {children}
    </View>
  );
}

const sty = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 25 : 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  libContainer: {
    width: Platform.OS === 'web' ? '70%' : '90%',
    height: '90%',
  },
});
