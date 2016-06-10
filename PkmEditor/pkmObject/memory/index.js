
let setValueAt = (offset, buffer, bin) => {
    for (var b = offset.bits, i = 0; b != 0; b--, i++, offset.address++) {
        bin[offset.address] = buffer[i];
    }
    return true;
};

let getValueAt = (offset, bin) => {
    let buffer = new Uint8Array(offset.bits);
    for (var b = offset.bits, i = 0; b != 0; b--, i++, offset.address++) {
        buffer[i] = bin[offset.address];
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