let pkmEdit = require('./../PkmEditor');
let en = require('./../PkmEditor/SaveObj/encryption');
let fs = require('fs');

let sav = pkmEdit.LoadFile('./test/main');
let pkm = pkmEdit.LoadFile('./test/pkm.pkx');
let pkm2 = sav.getPkmFromBox(5,2);
pkm2.nickName = "mitsos";
sav.setPkmToBox(pkm,5,8);
sav.setPkmToBox(pkm2,5,9);
sav.saveToFile('./test/main2');
pkm.saveToFile('./test/o.pkx');
pkm2.saveToFile('./test/o2.pkx');

console.log(sav.SID);