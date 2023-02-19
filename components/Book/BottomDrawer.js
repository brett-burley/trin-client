import React, { useEffect, useState } from 'react';
import { Divider, Tooltip, ButtonGroup, Icon, ListItem, CheckBox, BottomSheet, FAB, Text } from '@rneui/themed';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Popup from '../Extras/Popup';
import useBook from '../../hooks/useBook';
import useMode from '../../hooks/useMode';


function BottomDrawer()
{
  const [visible, setVisible] = useState(false);

  const close = () => setVisible(false);

  return (
    <SafeAreaProvider>
      <FAB
        icon={{ size: 20, type: "material-community", name: "open-in-app", color: "#fff" }}
        onPress={() => setVisible(true)}
        style={sty.fab}
        color="#2089dc"
        size="small"
      />
      <BottomSheet 
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
      >
        <View style={sty.menuContainer}>
          <View style={sty.menuContents}>
            <HeaderItem />
            <Divider />
            <ModesItem />
            <Divider />
            <BackItem close={close} />
            <Divider />
            <CancelItem close={close} />
          </View>
        </View>
      </BottomSheet>

      <Popup />
    </SafeAreaProvider>
  );
};


function HeaderItem()
{
  return (
    <ListItem>
      <ListItem.Content style={sty.headerContent}>
        <Icon type="material-icons" name="app-settings-alt" />
        <ListItem.Title style={sty.headerTitle}>
          App Settings
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}


function ModesItem()
{
  const { modes, changeMode } = useMode();
  const [selected, setSelected] = useState(-1);
  
  useEffect(() => {
    if(modes.listen)
      setSelected(1);
    else if(modes.learn)
      setSelected(2);
    else
      setSelected(0);
      
  }, [modes]);


  const buttons = ['Read', 'Listen', 'Learn'];
  
  function onPress(i)
  {
    const mode = buttons[i];
    changeMode(mode.toLowerCase());
  }

  return (
    <View>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={sty.changeTitle}>
            Change Mode:
          </ListItem.Title>

          <ButtonGroup
            onPress={i => onPress(i)}
            buttons={buttons}
            selectedIndex={selected}
            containerStyle={sty.buttonGroup}
          />
        </ListItem.Content>
      </ListItem>
    </View>
  );
}


function ChangedTooltip({ pressed })
{
  const { getModes } = useBook();
  const [show, setShow] = useState(false);
  const modes = getModes();


  useEffect(() => {
    if(!show)
      setShow(true) 
  }, [pressed]);

      
  const mode = getCurrentMode();

  return (
    <Tooltip 
      visible={true}
      popover={
        <Text style={sty.tooltipText}>
          {`Changed to ${mode}`}
        </Text>
      }
      withPointer={false}
      withOverlay={false}
      onOpen={() => setTimeout(() => setShow(false), 2000)}
    />
  );


  function getCurrentMode()
  {
    if(modes.read)
      return 'Read Mode';
    else if(modes.listen)
     return 'Listen Mode';
    else
      return 'Learn Mode';
      
  }
}


function BackItem({ close })
{
  const navigation = useNavigation();

  return (
    <ListItem onPress={onPress}>
      <Icon type="material-community" name="book-arrow-left-outline" /> 
      <ListItem.Content style={{ paddingTop: 5, paddingBottom: 5 }}>
        <ListItem.Title>Back to Library</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );


  function onPress()
  {
    navigation.navigate('Library');
    close();
  }
}



function CancelItem({ close })
{
  return (
    <ListItem
      onPress={close}
      containerStyle={sty.cancelItem}
    >
      <ListItem.Content style={sty.cancelContent}>
        <ListItem.Title style={sty.cancelTitle}>
          Close
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );  
}


const sty = StyleSheet.create({
  modesItem: {
    flex: 1,
    flexDirection: 'row',
  },
  menuContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  menuContents: {
    width: Platform.OS === 'web' ? '60%' : '100%',
    margin: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(187, 187, 187, 0.7)',
    boxShadow: Platform.OS == 'web' ? '2px 2px 25px 5px #bbb' : 'none',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    marginLeft: 10,
  },
  cancelItem: {
    backgroundColor: '#ff190c',
  },
  cancelContent: {
    alignItems: 'center',
  },
  cancelTitle: {
    color: '#fff',
  },
  fab: {
    alignSelf: 'center',
  },
  buttonGroup: {
    width: '100%',
  },
  changeTitle: {
    fontWeight: '600',
  },
  tooltipText: {
    color: '#fff',
  },
});

export default BottomDrawer;
