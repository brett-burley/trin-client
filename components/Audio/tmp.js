/*******************
  ALL FROM LINEAUDIO
**********************/
  async function audioFromAsset(asset)
  {
    try {
      const { sound } = await Audio.Sound.createAsync(asset)
      await sound.playAsync();
      setAudio(sound);
    } catch(e) {
      console.error(e);
      return false;
    }

  }

  async function createSound(line)
  {
    let sound = null;
    const saved = await net.post('speech/text', { line })
    if(!saved) return;

    const asset = await downloadFile(line);
    if(asset) {
      console.log('creating with asset');
      const res = await Audio.Sound.createAsync(asset);
      sound = res.sound;
    } else {
      console.log('creating with network');
      const res = await Audio.Sound.createAsync({ uri });
      sound = res.sound;
    }

    //saveLine(text, sound);
    await sound.playAsync();
    setAudio(sound);
  }


  async function downloadFile(line)
  {
    const filename = line + '.mp3';

    try {
      if(Platform.OS === 'web') {
        const assets = await Asset.loadAsync(uri);
        const asset = await assets[0].downloadAsync();
        return asset;
      }

      const info = await getFileInfo(filename);
  
      //if(info.exists)
        //await FileSystem.deleteAsync(info.uri);

      console.log(info);

      if(info.exists) {
        const options = {
          encoding: FileSystem.EncodingType.Base64,
          length: info.size,
          position: 0,
        }
        const fileString = await FileSystem.readAsStringAsync(info.uri, options);
        const text = base64.decode(fileString);
        const hash = md5(text);
        const meta = {
          hash, 
          name: line,
          type: 'mp3',
          httpServerLocation: 'https://trinity-api-nb7bzfogfa-uw.a.run.app/static/line.mp3',
          scales: [],
        }
        const asset = await Asset.fromMetadata(meta).downloadAsync();
        return asset;
      } else {
        // DOWNLOAD FILE
        const file = await FileSystem.downloadAsync(
          'https://trinity-api-nb7bzfogfa-uw.a.run.app/static/line.mp3',
          FileSystem.documentDirectory + filename,
          { md5: true }
        );

        file.filename = filename;
        console.log(file);
        const asset = await getFileAsset(file);
        //console.log('asset: ', asset);
        return asset;
      }
    } catch(err) {
      console.error(err);
      return null;
    }
  }

  async function assetFromData(name, data)
  {
    //const text = base64.decode(fileString);
    const hash = md5(data);
    const meta = {
      hash, 
      name,
      type: 'mp3',
      httpServerLocation: 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyBEyPTw_prwSnfFea4TabD4mlBKbRa3Ozw',
      scales: [],
    }
    const asset = await Asset.fromMetadata(meta).downloadAsync();
    return asset;
  }

  async function getFileAsset(file)
  {
    if(Platform.OS === 'web') return;
    
    try {
      const { md5, filename, uri } = file;

      const meta = {
        hash: md5,
        name: 'line',
        type: 'mp3',
        httpServerLocation: 'https://trinity-api-nb7bzfogfa-uw.a.run.app/static/',
        scales: [],
      }
      const asset = await Asset.fromMetadata(meta).downloadAsync();
      return asset;
    } catch(e) {
      console.error(e);
      return null;
    }
  }




  async function getFileInfo(name)
  {
    if(Platform.OS === 'web') return;


    const fileUri = FileSystem.documentDirectory + name;
    return await FileSystem.getInfoAsync(fileUri);
  }

