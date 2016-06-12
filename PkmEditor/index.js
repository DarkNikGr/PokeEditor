let fs = require('fs');
let SaveObj = require('./SaveObj');
let data = require('./Data');

let LoadBinary = (binary) => {
    switch (binary.length) {
        case 0x104:
            return new SaveObj.PK6(binary);
        case 0x76000:
            return new SaveObj.SAV6(binary, 'ORAS');
        case 0x65600:
            return new SaveObj.SAV6(binary, 'XY');
    }
};

let LoadFile = (path) => {
    let binary = fs.readFileSync(path);
    return LoadBinary(binary);
};

module.exports = {
    LoadFile: LoadFile,
    LoadBinary: LoadBinary,
    Data: data,
    SaveObj: SaveObj
};