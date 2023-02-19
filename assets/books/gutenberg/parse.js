const { readFileSync, writeFileSync } = require('node:fs');

const spaceCode = 12288;

main();

async function main()
{
  const file = await readFile();
  const lines = parseFile(file);
  const book = lines.map(line => {
    const length = line.length;
    const wordEnd = length > 1 ? length-1 : length
    return line.substring(0, wordEnd);
  })
  
  console.log('[');
  book.forEach(c => console.log(`  '${c}',`));
  console.log(']');
}


function parseFile(file)
{
  const tabs = file.split('\n');
  const lines = tabs.filter(line => line !== '');

  const cleaned = lines.map(line => {
   const code = line.charCodeAt(0);
    if(code === spaceCode) {
      return line.substring(2);
    } else {
      if(line !== '')
        return line;
    }
  });

  const parsed = [];
  cleaned.forEach(c => {
    c.split(/(?<=[，。；])/).forEach((e, i) => {
      const match = e.search(/[，。；]/) 
      if(match > -1 && e.length === 1) {
        
      } else {
        parsed.push(e)
      }
    })
  });

  return parsed;
}

async function readFile()
{
  return await readFileSync('./dairyOfAMadman/dairyOfAMadman.dat', { encoding: 'utf8' });
}

async function writeFile(book)
{
  try {
    await writeFileSync('./dairyOfAMadman/dairyOfAMadman.json', JSON.stringify(book));
  } catch(err) {
    console.error(err);
    return false;
  }
}
