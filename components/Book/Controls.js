import { View, StyleSheet } from 'react-native';
import { Divider, Text, Icon, Button, Input } from '@rneui/themed';
import useBook from '../../hooks/useBook';
import Summary from './Summary';


export default function Controls({ children })
{
  const { getPosition } = useBook();
  const p = getPosition();

  return (
    <View style={sty.controls}>
      <View style={sty.btns}>
        <ControlBtn type="doubleleft" disabled={p.sStart} />
        <ControlBtn type="left" disabled={p.lStart} />
        
        <View style={sty.middle}>
          {children}
          <Summary />
        </View>

        <ControlBtn type="right" disabled={p.lEnd} />
        <ControlBtn type="doubleright" disabled={p.sEnd} />
      </View>
     
    </View>
  );
}


function ControlBtn({ type, disabled })
{
  const { changeLine, prevSentence, nextSentence } = useBook();
  const iconColor = disabled ? '#86939e' : '#242424';
 

  return (     
    <Button
      style={sty.btn}
      containerStyle={sty.btn}
      buttonStyle={sty.btn}
      onPress={onPress}
      type="outline"
      disabled={disabled}
      disabledStyle={sty.disabled}
    >
      <Icon 
        type="antdesign" 
        name={type}
        style={sty.icon}
        color={iconColor}
      />
    </Button>
  );

  
  function onPress()
  {
    if(type === 'left')
      changeLine(-1);
    else if(type === 'right')
      changeLine(1);
    else if(type === 'doubleleft')
      prevSentence();
    else
      nextSentence();
  }
}


function LineBack({ disabled })
{
  const { changeLine } = useBook();
  const iconColor = disabled ? 'red' : '#242424';
  
  return (     
    <Button
      style={sty.btn}
      containerStyle={sty.btn}
      buttonStyle={sty.btn}
      onPress={() => changeLine(-1)}
      type="outline"
      disabled={disabled}
    >
      <Icon 
        type="antdesign" 
        name="left" 
        style={sty.icon}
        color={iconColor}
        disabled={disabled}
      />
    </Button>
  );
}


function LineForward({ disabled })
{
  const { changeLine } = useBook();

  return (     
    <Button
      style={sty.btn}
      containerStyle={sty.btn}
      buttonStyle={sty.btn}
      onPress={() => changeLine(1)}
      type="outline"
      disabled={disabled}
      disabledStyle={sty.disabled}
    >
      <Icon 
        type="antdesign" 
        name="right" 
        style={sty.icon}
      />
    </Button>
  );
}


function SentenceBack({ disabled })
{
  const { prevSentence } = useBook();
  const iconColor = disabled ? '#86939e' : '#242424';

  return (     
    <Button
      style={sty.btn}
      containerStyle={sty.btn}
      buttonStyle={sty.btn}
      onPress={() => prevSentence()}
      disabled={disabled}
      disabledStyle={sty.disabled}
      type="outline"
    >
     <Icon 
        type="antdesign" 
        name="doubleleft"
        style={sty.icon}
        color={iconColor}
      />
    </Button>
  );
}



function SentenceForward({ disabled })
{
  const { nextSentence } = useBook();

  return (     
    <Button
      style={sty.btn}
      containerStyle={sty.btn}
      buttonStyle={sty.btn}
      onPress={() => nextSentence()}
      disabled={disabled}
      disabledStyle={sty.disabled}
      type="outline"
    >
      <Icon
        type="antdesign" 
        name="doubleright" 
        style={sty.icon}
      />
    </Button>
  );
}


const sty = StyleSheet.create({
  controls: {
    flex: 1,
    width: '100%',
    height: '100%',
  },  
  btns: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  middle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  btn: {
    flex: 2,
    height: '100%',
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  disabled: {
    backgroundColor: '#e3e6e8',
    opacity: 0.7,
  },
});
