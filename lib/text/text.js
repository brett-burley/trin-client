function formatMandarin(mandarin)
{
  console.log(mandarin)
  console.log('--------');
  const text = mandarin.replace(/[ \n]/g,'');
   
  const regex = /(.*?[。，！])/g
  const split = text.split(regex);
  return split.filter(c => c !== "");
}
/*
function formatMandarin(mandarin)
{
  const tabs = mandarin.split('\n');
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

*/
module.exports = { formatMandarin };
