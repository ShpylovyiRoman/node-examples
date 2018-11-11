'use strict';

const fs = require('fs');
const translate = require('google-translate-api');

const eng = fs.readFileSync('/home/aezakmi/eng.txt', 'utf8');
console.log(eng);
//not working...
translate('Hello world', { from: 'en', to: 'uk' })
  .then(ru => { console.log(ru.text); })
  .catch(err => { console.error(err); });
