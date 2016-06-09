var memmory = require('./../memmory');

class pkmObject {
    constructor(binary, type) {
        this._bin = binary;
        this._type = type | 'pkx';
    }
    
    get nationalID() {
        let offset = memmory[this._type].map.NATIONAL_POKEDEX_ID;
        if (offset) {
            let value = memmory.RW.getValueAt(offset.address, offset.bits, this._bin);
            let u16a = new Uint16Array(value.buffer);
            return u16a[0];
        } else return null;
    }
    set nationalID(pokedexId) {
        let offset = memmory[this._type].map.NATIONAL_POKEDEX_ID;
        if (offset) {
            let buffer = new Uint16Array([pokedexId]);
            let value = new Uint8Array(buffer.buffer);
            memmory.RW.setValueAt(offset.address, value, offset.bits, this._bin);
        } else return false;
        return true

    }
}

module.exports = pkmObject;