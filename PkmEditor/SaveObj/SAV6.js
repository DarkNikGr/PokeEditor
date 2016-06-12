let Memory = require('./memory');
let Encryption = require('./encryption');
let fs = require('fs');
let PK6 = require('./PK6');

class SAV6 {
    constructor(binary, type) {
        this._bin = binary;
        this._type = type;
        this._offset = Memory.SAV6.MAP[this._type];
    }

    get binary() {
        return this._bin.slice(0);
    }

    saveToFile(path) {
        var res = "";
        this._bin.forEach((b) =>{
            res += String.fromCharCode(b);
        });
        fs.writeFileSync(path, res, 'binary');
    }
    
    get gameType() {
        return this._type;
    }

    getPkmFromBoxByPos(pos) {
        let pkxOffset = {
            address: this._offset.BOX.address  + (pos * 0xE8),
            bits: 0xE8
        };
        let ekx = Memory.RW.getValueAt(pkxOffset,this._bin);
        var pkm = Encryption.PK6.decrypt(ekx);
        if (Encryption.PK6.verifyChk(pkm) && (pkm[8] | pkm[9]) != 0)
            return new PK6(pkm, pos);
        return null;
    }
    getPkmFromBox(box, slot) {
        let pos = ((box - 1) * 30) + slot - 1;
        return this.getPkmFromBoxByPos(pos);
    }
    getAllPkmFromBox() {
        let res = [];
        let tmp;
        for (var i = 0; i < 930; ++i) {
            tmp = this.getPkmFromBoxByPos(i);
            if (tmp)
                res.push(tmp);
        }
        return res;
    }
    setPkmToPos(pkm, pos) {
        let tmpPkm = new Uint8Array(0xE8);
        for(let i=0; i < 0xE8; i++)
            tmpPkm[i] = pkm.binary[i];
        let ekx = Encryption.PK6.encrypt(tmpPkm);
        let pkxOffset = {
            address: this._offset.BOX.address  + (pos * 0xE8),
            bits: 0xE8
        };
        Memory.RW.setValueAt(pkxOffset, ekx, this._bin);
    }
    setPkmToBox(pkm, box, slot) {
        let pos = ((box - 1) * 30) + slot - 1;
        this.setPkmToPos(pkm, pos);
    }

    get TID() {
        let offset = {
            address: this._offset.TRAINER_CARD.address,
            bits: 0x2
        };
        let memory = Memory.RW.getValueAt(offset, this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    set TID(tid) {
        let offset = {
            address: this._offset.TRAINER_CARD.address,
            bits: 0x2
        };
        let buffer = new Uint16Array([tid]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(offset, memory, this._bin);
    }

    get SID() {
        let offset = {
            address: this._offset.TRAINER_CARD.address + 0x2,
            bits: 0x2
        };
        let memory = Memory.RW.getValueAt(offset, this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    set SID(sid) {
        let offset = {
            address: this._offset.TRAINER_CARD.address + 0x2,
            bits: 0x2
        };
        let buffer = new Uint16Array([sid]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(offset, memory, this._bin);
    }
}

module.exports = SAV6;