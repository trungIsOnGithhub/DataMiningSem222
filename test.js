const { levenshtein } = require('./js/levenshtein.js');
const { jaro_wrinkler } = require('./js/jaro_winkler.js');

let str1 = 'DwAyNE';
let str2 = 'DuANE';

console.log(jaro_wrinkler(str1,str2,0.7));
console.log(jaro_Winkler(str1,str2));