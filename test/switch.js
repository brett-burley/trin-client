const a = {};
const isObject = typeof a === 'object';

function main()
{
  switch(a) {
    case true:
      return 'true';
    case null:
      return 'null';
      break;
    case typeof a === 'object':
      return 'object';
  }
}

console.log(isObject);

console.log(main());
