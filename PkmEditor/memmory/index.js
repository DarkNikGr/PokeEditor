
let setValueAt = (address, buffer, bits, bin) => {
    for (var b = bits, i = 0; b != 0; b--, i++, address++) {
        bin[address] = buffer[i];
    }
    return true;
};

let getValueAt = (address, bits, bin) => {
    for (var b = bits, i = 0; b != 0; b--, i++, address++) {
        buffer[i] = bin[address];
        if (i > 0xFFF)
            break;
    }
    return buffer;
};

module.exports = {};
module.exports.setValueAt = setValueAt;
module.exports.getValueAt = getValueAt;
module.exports.pkx = require('./pkx');