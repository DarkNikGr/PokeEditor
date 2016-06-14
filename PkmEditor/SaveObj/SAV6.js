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

    SaveToFile(path) {
        var res = "";
        this._bin.forEach((b) =>{
            res += String.fromCharCode(b);
        });
        fs.writeFileSync(path, res, 'binary');
    }
    
    get gameType() {
        return this._type;
    }

    GetPkmBoxPos(pos) {
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
    GetPkmBox(box, slot) {
        let pos = ((box - 1) * 30) + slot - 1;
        return this.GetPkmBoxPos(pos);
    }
    GetAllPkmBoxs() {
        let res = [];
        let tmp;
        for (var i = 0; i < 930; ++i) {
            tmp = this.GetPkmBoxPos(i);
            if (tmp)
                res.push(tmp);
        }
        return res;
    }
    SetPkmBoxPos(pkm, pos) {
        let ekx = Encryption.PK6.encrypt(pkm.binary);
        let pkxOffset = {
            address: this._offset.BOX.address  + (pos * 0xE8),
            bits: 0xE8
        };
        Memory.RW.setValueAt(pkxOffset, ekx, this._bin);
    }
    SetPkmBox(pkm, box, slot) {
        let pos = ((box - 1) * 30) + slot - 1;
        this.SetPkmBoxPos(pkm, pos);
    }
    DeletePkmBoxPos(pos) {
        let empty = new Uint8Array(0xE8);
        let pkxOffset = {
            address: this._offset.BOX.address  + (pos * 0xE8),
            bits: 0xE8
        };
        Memory.RW.setValueAt(pkxOffset, empty, this._bin);
    }
    DeletePkmBox(box, slot) {
        let pos = ((box - 1) * 30) + slot - 1;
        this.DeletePkmBoxPos(pos);
    }
    MovePkmBoxPos(src, dest) {
        this.ClonePkmBoxPos(src, dest);
        this.DeletePkmBoxPos(src);
    }
    MovePkmBox(sbox, sslot, dbox, dslot){
        let src = ((sbox - 1) * 30) + sslot - 1;
        let dest = ((dbox - 1) * 30) + dslot - 1;
        this.MovePkmBoxPos(src, dest);
    }
    ClonePkmBoxPos(src, dest) {
        let pkm = this.GetPkmBoxPos(src);
        if (pkm)
            this.SetPkmBoxPos(pkm, dest);
    }
    ClonePkmBox(sbox, sslot, dbox, dslot){
        let src = ((sbox - 1) * 30) + sslot - 1;
        let dest = ((dbox - 1) * 30) + dslot - 1;
        this.ClonePkmBoxPos(src, dest);
    }

    GetTID() {
        let offset = {
            address: this._offset.TRAINER_CARD.address,
            bits: 0x2
        };
        let memory = Memory.RW.getValueAt(offset, this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    SetTID(tid) {
        let offset = {
            address: this._offset.TRAINER_CARD.address,
            bits: 0x2
        };
        let buffer = new Uint16Array([tid]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(offset, memory, this._bin);
    }

    GetSID() {
        let offset = {
            address: this._offset.TRAINER_CARD.address + 0x2,
            bits: 0x2
        };
        let memory = Memory.RW.getValueAt(offset, this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    SetSID(sid) {
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