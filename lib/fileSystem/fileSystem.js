const FileSystem = require('expo-file-system');
const { Platform } = require('react-native');

export async function saveData(name, data)
{
  try {
    if(Platform.OS === 'web') {
      const json = JSON.stringify(data);
      localStorage.setItem(name, json);  
    } else {
      console.log('save for mobile');
      /*
      const response = await FileSystem.writeAsStringAsync('file:data/audio.mp3', contents, { options: { encoding: FileSystem.EncodingType.Base64 } } );
      console.log('save on mobile');
      return true;
      */
    }
    
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
}

/*
export async function getData(name)
{
  try {
    if(Platform.OS === 'web') {
      const items = await localStorage.getItem(name);
      console.log(items);
      return JSON.parse(items[0]);
    } else {
      console.log('save for mobile');
      const response = await FileSystem.writeAsStringAsync('file:data/audio.mp3', contents, { options: { encoding: FileSystem.EncodingType.Base64 } } );
      console.log('save on mobile');
      return true;
    }
    
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }

}
*/
