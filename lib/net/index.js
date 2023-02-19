const axios = require('axios');
const { Asset } = require('expo-asset');
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const apiUrl = Constants.expoConfig.extra.apiUrl;
console.log(apiUrl);

const instance = axios.create({
  baseURL: apiUrl,
});


async function getLine(text)
{
  try {
    const data = {
      audioConfig: {
        audioEncoding: "MP3",
        pitch: 0,
        speakingRate: 1
      },
      input: {
        text,
      },
      voice: {
        languageCode: "cmn-CN",
        name: "cmn-CN-Standard-C"
      }
    }

    console.log('getLine()');
    const res = await instance.post('proxy', data);
    console.log(res);
    return res.data;
  } catch(err) {
    console.log(err);
    return false;
  }
}



async function post(route, data)
{
  try {
    const res = await instance.post(route, data);
    return res.data;
    //return true;
  } catch(err) {
    console.error(err);
    return false;
  }
}


async function get(route)
{
  try {
    const res = await instance.get(route);
    return res;
  } catch(err) {
    console.log('error here get');
    console.error(err);
    return false;
  }
}


async function getAudio(line)
{
  try {
    const saved = await instance.post('speech/text', { line });
    if(!saved)
      throw new Error('Line.mp3 not saved');

    console.log('loading asset');
    const audio = await Asset.loadAsync('http://localhost:8080/static/line.mp3');
    console.log('loadAsync:', audio);
    return audio[0];
  } catch(err) {
    console.log('error here get');
    console.error(err);
    return false;
  }


  function getHeaders()
  {
    return {
      "accept":"*/*",
      "accept-language":"en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
      "range":"bytes=0-0",
      "if-none-match":"W/\"1-QgmbSvAh5T/Y/U4FbCVo18Lj/6g\""
    };

  }
}

function getURL()
{
  const apiUrl = Constants.expoConfig.extra.apiUrl;
  const os = Platform.OS;
  if(os === 'web')
    return apiUrl || 'http://localhost:8080/';
  else
    return ip;
}

export default { getLine, getAudio, apiUrl, get, post };
