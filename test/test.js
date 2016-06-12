let pkmEdit = require('./../PkmEditor');
let en = require('./../PkmEditor/SaveObj/encryption');
let fs = require('fs');

let sav = pkmEdit.load('./test/main');
let pkm = pkmEdit.load('./test/pkm.pkx');
let pkm2 = sav.getPkmFromBox(5,2);
pkm2.nickName = "mitsos";
sav.setPkmToBox(pkm.binary,5,8);
sav.setPkmToBox(pkm2.binary,5,9);
sav.saveToFile('./main2');
pkm.saveToFile('./o.pkx');
pkm2.saveToFile('./o2.pkx');
