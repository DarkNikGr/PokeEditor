let fs = require('fs');
let pkmObject = require('./Files');
let fileTypeSize = require('./fileTypeSize.js');
let data = require('./Data');

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