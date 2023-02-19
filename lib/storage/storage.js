import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import net from '../net';


async function saveLine(name, asset)
{
  try {
    //const saved = await net.post('speech/text', { line })
    //const audio = await net.get('static/line.mp3');
    //const hash = md5(audio);
    //const blob = new Blob([asset], { type: 'audio/mpeg' })
    //await AsyncStorage.setItem(name, blob);
    console.log(asset);
    const db = await window.indexedDB.open("line", 3);
    gt
    console.log(db);
    return true;
  } catch(err) {
    return false;
  }
}


async function getLine(name)
{
  const type = 'audio/mpeg';
  try {
    //const json = await AsyncStorage.getItem(name);
    //const data = JSON.parse(json);
    //const blob = new Blob([data], {type});
    //const file = new File([blob], name, {type});
    const blob = await AsyncStorage.getItem(name);
    console.log(blob);
    return file;
  } catch (e) {
    return null;
  }
}

const saveData = async (name, value) => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(name, data);
    return true;
  } catch (e) {
    return false;
  }
}


const getData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if(!value) return null;

    return JSON.parse(value);
  } catch(e) {
    return null;
  }
}


export default { saveLine, getLine, getData, saveData };
