const { readFileSync } = require('node:fs');

async function main()
{
  const data = await readFileSync('./radicals.dat', { encoding: 'utf-8' });
  const lines = data.split('\n');

  const result = [];
  lines.forEach((c, i) => {
    if((i % 2) !== 0) {
      const rad = c.split('\t');

      result.push(rad.map((c, i) => {
        if(typeof c === "string") {
          return "'" + c + "'";
        }
        return c;
      }))
    }
  })

  result.forEach(c => console.log('[' + c + '],'));

}

main();
