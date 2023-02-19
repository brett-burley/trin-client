import { useEffect } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Button, Card, Image } from "@rneui/themed";
import useLibrary from '../../hooks/useLibrary';
import useBook from '../../hooks/useBook';
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native';
import useAlert from '../../hooks/useAlert';

export default function Books()
{
  const apiUrl = Constants.expoConfig.extra.apiUrl;
  const { setAlert } = useAlert();
  const { titles } = useLibrary();
  const navigation = useNavigation();
  
  function navigate(id)
  {
    navigation.navigate('Book', { id });
  }

  // NOTE: Remove for prod
  /*
  useEffect(() => {
    navigate(id);
  }, []);
  */

  return (
    <View style={sty.container}>
      <DisplayBooks />
    </View>
  );


  function DisplayBooks()
  {
    return titles.map(entry => {
      const { id, title, imgUri } = entry; 
      const uri = apiUrl + imgUri
      
      return (
        <Pressable 
          key={id}
          onPress={() => navigate(id)}
        >
          <Card 
            containerStyle={sty.displayContainer}
            wrapperStyle={sty.wrapperStyle}
          >
            <View style={sty.book}>
              <Image
                style={sty.bookImg}
                resizeMode="contain"
                source={{ uri }}
              />
            </View>
            <Card.Title style={sty.title}>
              {title.mandarin}
            </Card.Title>
            <Card.Title style={sty.title}>
              {title.english}
            </Card.Title>
          </Card>
        </Pressable>
      );
    });
  }
}



const sty = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  displayContainer: {
    maxWidth: 150,
    minHeight: 270,
    padding: 0,
  },
  book: {
    position:"relative",
    alignItems:"center",
  },
  bookImg: {
    width: 150,
    height: 220
  },
  title: {
    fontSize: 10,
    margin: 0,
  },
});
