let Memory = require('./memory');
let Encryption = require('./encryption/index');
let PK6 = require('./PK6');

class SAV6 {
    constructor(binary, type){
        this._bin = binary;
        this._type = type;
        this._offset = Memory.SAV6.MAP[this._type];
    }
    
    get gameType() {
        return this._type;
    }

    getPkmFromBox(box, slot) {
        let pos = (box * 30) + slot;
        let pkxOffset = {
            address: 0x33000 + (pos * 232),
            bits: 232
        };
        let pkm = Memory.RW.getValueAt(pkxOffset,this._bin);
        pkm = Encryption.PK6.decrypt(pkm);
        if (Encryption.PK6.verifyChk(pkm) && (pkm[8] | pkm[9]) != 0) {
            return new PK6(pkm);
        }
        return null;
    }
}

module.exports = SAV6;