let fs = require('fs');
let SaveObj = require('./SaveObj');
let data = require('./Data');

let loader = (path) => {
    let file = fs.readFileSync(path);
    switch (file.length) {
        case 0x104:
            return new SaveObj.PK6(file);
        case 0x76000:
            return new SaveObj.SAV6(file, 'ORAS');
        case 0x65600:
            return new SaveObj.SAV6(file, 'XY');
    }
};


module.exports = {
    load: loader,
    data: data,
    SaveObj: SaveObj
};