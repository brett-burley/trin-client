import { useEffect, useState } from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import LibraryNav from './LibraryNav';

export default function Library({ navigation })
{
  return (
    <View style={sty.container}>
      <View style={sty.libContainer}>
        <LibraryNav />
      </View>
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
  libContainer: {
    minWidth: '90%',
    height: '90%',
  },
});
