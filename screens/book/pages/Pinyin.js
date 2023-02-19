import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { chineseToPinyin } from '../../../lib/pinyin/pinyin';


export default function Pinyin({ chinese })
{
  return (
    <Text style={sty.text}>
      {chineseToPinyin(chinese)}
    </Text>
  );
}

const sty = StyleSheet.create({
  text: {
    fontSize: 40,
  },
});
