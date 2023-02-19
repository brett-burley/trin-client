const { chineseToPinyin } = require('../lib/pinyin/pinyin');

const c1 = chineseToPinyin('我亲爱的孩子');

const c2= 'wo qin ai de hai zi';

for(let i in c1) {
  console.log(c1[i], c1.codePointAt(i));
  console.log(c2[i], c2.codePointAt(i));
}


const check = {
  ǒ: 111,
  ī: 105,
  à: 97,
  á: 97,
  ē: 101
}

function checkInput(s1, s2) {
  for(let i in s1) {
    const c1 = s1[i]
    const c2 = s2[i];

    if(c1 === c2) {
      console.log(c1, c2, ' are same');
      continue;
    }

    if(!check[c1]) {
      return false;
    }
  }

  return true;
}

console.log(checkInput(c1, c2));
