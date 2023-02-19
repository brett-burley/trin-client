import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';

import useBook from '../../../hooks/useBook';
import usePage from '../../../hooks/usePage';

export default function Controls()
{

  return (
    <View style={sty.controls}>
      <PageBackward /> 
      
      <LineBtns />

      <PageForward />
    </View>
  );
}


function LineBtns()
{
  const { mode } = usePage();
  
  if(mode === 'read') return null;
  return (
    <View style={sty.line}>
      <LineBackward />
      <LineForward />
    </View>
  );
}


function PageBackward()
{
  return (
    <Button 
      size="lg" 
      type="outline" 
      buttonStyle={sty.btn}
    >
      <Icon
        type="material-community" 
        name="page-previous-outline" 
        size={30}
      />
    </Button>
  );  
}
function PageForward()
{
  const { pageForward } = useBook();

  return (
    <Button 
      onPress={pageForward}
      size="lg" 
      type="outline" 
      buttonStyle={sty.btn}
    >
      <Icon
        type="material-community"
        name="page-next-outline" 
        size={30}
      />
    </Button>
  );  
}

function LineBackward()
{
  const { lineBackward, lineStart } = useBook();

   return (
    <Button
      onPress={lineBackward}
      size="lg"
      type="outline"
      disabled={lineStart}
      buttonStyle={sty.btn}
    >
      <Icon
        type="material"
        name="first-page"
        size={30}
      />
    </Button>
  );
}

function LineForward()
{
  const { lineForward, lineEnd } = useBook(); 
  
   return (
    <Button
      onPress={lineForward}
      size="lg"
      type="outline"
      disabled={lineEnd}
      buttonStyle={sty.btn}
    >
      <Icon
        type="material"
        name="last-page"
        size={30}
      />
    </Button>
  );
}


const sty = StyleSheet.create({
  controls: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  btn: {
    paddingRight: 26,
    paddingLeft: 26,
    paddingTop: 16,
    paddingBottom: 16,
    margin: 2
  },
  line: {
    flexDirection: 'row',
  },
});
