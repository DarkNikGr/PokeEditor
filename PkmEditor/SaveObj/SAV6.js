let Memory = require('./memory');
let Encryption = require('./encryption');
let PK6 = require('./PK6');

class SAV6 {
    constructor(binary, type) {
        this._bin = binary;
        this._type = type;
        this._offset = {};
        Object.keys(Memory.SAV6.MAP[this._type]).forEach((key) => {
            this._offset[key] = {
                address: Memory.SAV6.MAP[this._type][key].address - 0x5400,
                bits: Memory.SAV6.MAP[this._type][key].bits
            }
        });
    }
    
    get gameType() {
        return this._type;
    }

    getpkmFromBoxByPos(pos) {
        let pkxOffset = {
            address: this._offset.BOX_DATA.address  + (pos * 232),
            bits: 232
        };
        let pkm = Memory.RW.getValueAt(pkxOffset,this._bin);
        pkm = Encryption.PK6.decrypt(pkm);
        if (Encryption.PK6.verifyChk(pkm) && (pkm[8] | pkm[9]) != 0) {
            return new PK6(pkm);
        }
        return null;
    }

    getPkmFromBox(box, slot) {
        let pos = (box * 30) + slot;
        return this.getpkmFromBoxByPos(pos);
    }


    getAllPkmFromBox() {
        var res = [];
        var tmp;
        for (var i = 0; i < 930; ++i) {
            tmp = this.getpkmFromBoxByPos(i);
            if (tmp) {
                res.push(tmp);
            }
        }
        return res;
    }
}

module.exports = SAV6;