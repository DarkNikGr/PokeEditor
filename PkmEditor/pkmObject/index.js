var memmory = require('./../memmory');

class pkmObject {
    constructor(binary) {
        this._bin = binary;
    }

    get nationalID() {
        let offset = memmory.pkx.map.NATIONAL_POKEDEX_ID;
        let value = memmory.getValueAt(offset.address, offset.bits, this._bin);
        let u16a = new Uint16Array(value.buffer);
        return u16a[0];
    }
    set nationalID(pokedexId) {
        let offset = memmory.pkx.map.NATIONAL_POKEDEX_ID;
        var buffer = new Uint16Array([pokedexId]);
        var value = new Uint8Array(buffer.buffer);
        memmory.setValueAt(offset.address, value, offset.bits, this._bin);
    }
}

module.exports = pkmObject;