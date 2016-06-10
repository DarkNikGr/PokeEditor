let fs = require('fs');
let SaveObj = require('./SaveObj');
let data = require('./Data');

let fileTypeSize = {
    GEN6_POKEMON_DECRYPDET: 0x104,
    GEN6_SAVE_ORAS: 0x76000,
    GEN6_SAVE_XY: 0x65600
};

let loader = (path) => {
    let file = fs.readFileSync(path);
    switch (file.length) {
        case fileTypeSize.GEN6_POKEMON_DECRYPDET:
            return new SaveObj.PK6(file);
        case fileTypeSize.GEN6_SAVE_ORAS:
            return new SaveObj.SAV6(file, 'ORAS');
        case fileTypeSize.GEN6_SAVE_XY:
            return new SaveObj.SAV6(file, 'XY');
    }
};


module.exports = {
    load: loader,
    data: data,
    SaveObj: SaveObj
};