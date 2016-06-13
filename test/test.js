let pkmEdit = require('./../PkmEditor');
let en = require('./../PkmEditor/SaveObj/encryption');
let fs = require('fs');

let sav = pkmEdit.LoadFile('./test/main');
let pkm = pkmEdit.LoadFile('./test/pkm.pkx');


sav.movePkmFromBox(5,5,5,26);
sav.clonePkmFromBox(5,4,5,29);
let pkm2 = sav.getPkmFromBox(5,1);
pkm.nickName = "mpampis";
pkm2.nickName = "maria";
sav.setPkmToBox(pkm, 5,27);
sav.setPkmToBox(pkm2, 5,28);
sav.deletePkmFromBox(5,7);

sav.saveToFile('./test/main2');
pkm.saveToFile('./test/o.pkx');
