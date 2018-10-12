let pkmEdit = require('./../PkmEditor');
let en = require('./../PkmEditor/SaveObj/encryption');
let fs = require('fs');

let sav = pkmEdit.LoadFile('./test/main');
let pkm = pkmEdit.LoadFile('./test/pkm.pkx');

sav.MovePkmBox(5, 5, 5, 26);
sav.ClonePkmBox(5, 9, 5, 29);
let pkm2 = sav.GetPkmBox(5, 1);
pkm.SetNickName('mpampis');
pkm2.SetNickName('maria');
sav.SetPkmBox(pkm, 5, 27);
sav.SetPkmBox(pkm2, 5, 28);
sav.DeletePkmBox(5, 7);

sav.SaveToFile('./test/main2');
pkm.SaveToFile('./test/o.pkx');
pkm2.SaveToFile('./test/o2.pkx');
