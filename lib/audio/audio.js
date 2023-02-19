import { post } from '../axios/axios'; 

export async function translateText(text)
{
  try {
    console.log('translateText');
    const saved = await post('speech/text', { text });
    if(!saved) {
      throw new Error('Could not translate text');
    }
    return true;
  } catch(err) {
    return false;
  }
}
