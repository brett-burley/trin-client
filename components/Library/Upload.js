import { useState, useRef, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Card, Button, Input, Icon } from '@rneui/themed';
import useLibrary from '../../hooks/useLibrary';
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { formatMandarin } from '../../lib/text/text';


export default function Upload()
{
  const apiUrl = Constants.expoConfig.extra.apiUrl;

  const navigation = useNavigation();
  const nameRef = useRef('');

  function navigate()
  {
    //navigation.navigate('Book', { id });
    return;
  }

  return (
    <View style={sty.container}>
      <Card containerStyle={sty.card}>
        <Card.Title>
          <Input
            placeholder='name'
            ref={nameRef}
            onChangeText={value => nameRef.current = value}
            containerStyle={sty.name}
          />
        </Card.Title>
        
        <Card.Divider />
        
        <UploadBody />
      </Card>
    </View>
  );

  function UploadBody()
  {
    const [text, setText] = useState();
    const uploadStr = '有一只猴子说，“不知道这条河是从哪里来的。今天我们没有什么事情，我们去找一找吧！"';

    const loading = text === '';
    return (
      <View style={sty.cardBody}>
        <View style={sty.uploadBody}>
          <Content />
        </View>
      </View>
    );


    function Content()
    {
      if(text && text.length > 0) {
        return <Text>{text}</Text>
      }

      return (
        <Button
          title="Upload Text"
          onPress={onPress}
          loading={loading}
        />
      );
    }


    async function onPress()
    {
      try {
        setText('');
        
        const options = {
          copyToCacheDirectory: true,
          type: 'text/*'
        };
        const doc = await DocumentPicker.getDocumentAsync(options);

        const uploadStr = await FileSystem.readAsStringAsync(doc.uri);
        if(uploadStr)
          setText(uploadStr);
      } catch(e) {
        console.error(e);
        setText(null);
      }
    }
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
    borderStyle: 'solid',
    borderColor: 'rgba(32,139,220,0.7)',
    borderWidth: 1,
    boxShadow: '3px 5px 7px 2px rgba(0,0,0,0.2)',
  },
  card: {
    height: '90%',
    width: '90%',
  },
  name: {
    maxWidth: '75%',
  },
  cardBody: {
    height: '100%',
    width: '100%',
  },
  uploadBody: {
    marginTop: '25%',
  },
});
