let fs = require('fs');
let pkmObject = require('./Files');
let data = require('./Data');

let fileTypeSize = {
    GEN6_POKEMON_DECRYPDET: 0x104,
    GEN6_SAVE_ORAS: 0x76000
};

let loader = (path) => {
    let file = fs.readFileSync(path);
    switch (file.length) {
        case fileTypeSize.GEN6_POKEMON_DECRYPDET:
            return new pkmObject.PK6(file);
    }
};


module.exports = {
    load: loader,
    data: data,
    pkmObject: pkmObject
};