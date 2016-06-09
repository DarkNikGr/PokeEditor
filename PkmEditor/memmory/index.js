
let setValueAt = (address, buffer, bits, bin) => {
    for (var b = bits, i = 0; b != 0; b--, i++, address++) {
        bin[address] = buffer[i];
    }
    return true;
};

let getValueAt = (address, bits, bin) => {
    let buffer = new Uint8Array(bits);
    for (var b = bits, i = 0; b != 0; b--, i++, address++) {
        buffer[i] = bin[address];
        if (i > 0xFFF)
            break;
    }
    return buffer;
};

module.exports = {
    RW: {
        setValueAt: setValueAt,
        getValueAt: getValueAt
    },
    pkx: require('./pkx')
};