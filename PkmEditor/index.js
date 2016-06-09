let fs = require('fs');
let pkmObject = require('./pkmObject');
let data = require('./Data');

let load_pkx = (path) => {
    let pkmfile = fs.readFileSync(path);
    return new pkmObject.pkx(pkmfile);
};


module.exports = {
    load: {
        pkx: load_pkx
    },
    data: data,
    pkmObject: pkmObject
};