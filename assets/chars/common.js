const fs = require('fs');
const path = require('node:path');



async function main()
{
  const file = fs.readFileSync('./common.dat', 'utf-8');
  const lines = file.split('\n')
  
  console.log('{');
  const results = lines.forEach(line => {
    const c = line.split('\t')
    const character = c[1];
    const pinyin = c[2];
    const english = c[3];
    const code = character.codePointAt(0);
    const filePath = __dirname + `/common/${code}.mp3`;
    
    console.log(`'${character}':{pinyin:'${pinyin}',english:'${english}',code: ${code},audio: require('${filePath}')},`);
  })

  console.log('}');

}

main();
