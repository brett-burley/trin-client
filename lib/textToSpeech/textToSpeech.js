const axios = require('axios');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const { saveData } = require('../fileSystem/fileSystem');

async function mandarinToAudio(text, type) {
  try {
    const res = await axios({ method: 'post',
      url: 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyBEyPTw_prwSnfFea4TabD4mlBKbRa3Ozw',
      data: {
        "audioConfig": {
          "audioEncoding": "MP3",
          "pitch": 0,
          "speakingRate": 1
        },
        "input": {
          "text": `${text}`
        },
        "voice": {
          "languageCode": "cmn-CN",
          "name": "cmn-CN-Standard-C"
        }
      }
    });

    const contents = res.data.audioContent;
    saveData(contents);
    return true;
    const file = new File([contents], 'audio.mp3', { type: 'audio/mpeg' });
    console.log('file: ', file);
    let url = await URL.createObjectURL(file);
    console.log('url: ', url);
    return url;
  } catch(err) {
    console.log(err);
    return false;
  }
}


function saveFile(type, data)
{
  console.log('saveFile() ', type, data);
  if(type === 'android') {
    console.log('Save file for android');
    throw new Error('Tried to save for android');
  } else if(type === 'ios') {
    console.log('Save file for ios');
    throw new Error('Tried to save for ios');
  } else {
    console.log('save for browser');
    localStorage.setItem('lineFile', data);
  }
}
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function toAudio(text)
{
  try {
    const request = getRequest(text);

    const [response] = await client.synthesizeSpeech(request);

    return response.audioContent;
  } catch(err) {
    console.error(err);
    return '';
  }
}

function getRequest(text)
{
  return {
    input: {
      text: text
    },
    voice: {
      languageCode: "cmn-CN",
      name: "cmn-CN-Standard-C",
      ssmlGender: 'NEUTRAL'
    },
    audioConfig: {
      audioEncoding: 'MP3'
    }
  };
}


async function restToAudio(text) {
  try {
    console.log(`Fetching translation ${text}`);
    const res = await axios({ method: 'post',
      url: 'https://texttospeech.googleapis.com/v1beta1/text:synthesize',
      data: {
        "audioConfig": {
          "audioEncoding": "MP3",
          "pitch": 0,
          "speakingRate": 1
        },
        "input": {
          "text": `${text}`
        },
        "voice": {
          "languageCode": "cmn-CN",
          "name": "cmn-CN-Standard-C"
        }
      }
    });

    return res.data.audioContent;
  } catch(err) {
    console.log(err);
    return false;
  }
}


export { restToAudio, toAudio, mandarinToAudio };
