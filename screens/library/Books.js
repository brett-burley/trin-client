import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Card, Image } from "@rneui/themed";
import useBook from '../../hooks/useBook';
import { allTitles } from '../../assets/books/titles';

export default function Books({ navigate })
{
  const { id, title, img } = allTitles;
  return (
    <View style={sty.container}>
      <Pressable onPress={() => navigate(id)}>
        <BookDisplay title={title} img={img} />
      </Pressable>
    </View>
  );
}

function BookDisplay({ title, img })
{
  return (
    <Card containerStyle={sty.displayContainer} wrapperStyle={sty.wrapperStyle}>
      <View style={{position:"relative",alignItems:"center"}}>
        <Image
            style={sty.book}
            resizeMode="contain"
            source={img}
          />
      </View>
      <Card.Title style={sty.title}>{title.mandarin}</Card.Title>
      <Card.Title style={sty.title}>{title.english}</Card.Title>
    </Card>
  );
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
    borderStyle: 'solid',
    borderColor: 'rgba(32,139,220,0.7)',
    borderWidth: 1,
    boxShadow: '3px 5px 7px 2px rgba(0,0,0,0.2)',
  },
  displayContainer: {
    maxWidth: 150,
    minHeight: 270,
    padding: 0,
  },
  title: {
    fontSize: 10,
    margin: 0,
  },
  book: {
    width: 150,
    height: 220
  },
});
