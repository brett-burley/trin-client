const pinyin = require("chinese-to-pinyin")

const check = {
  ǒ: 'o',
  ī: 'i',
  à: 'a',
  á: 'a',
  ē: 'e',
}

function chineseToPinyin(text)
{
  if(text)
    return pinyin(text);
  return '';
}

function checkInput(pinyin, text) {
  for(let i in pinyin) {
    const p = pinyin[i];
    const t = text[i];

    if(p === t) {
      console.log('chars are same');
      continue;
    }

    if(check[p] !== t) {
      return false;
    }
  }

  return true;
}

module.exports = { chineseToPinyin, checkInput };
