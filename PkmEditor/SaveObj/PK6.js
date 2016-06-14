let Memory = require('./memory/index');
let Encryption = require('./encryption');
let fs = require('fs');

class PK6 {
    constructor(binary, posBox) {
        this._bin = new Uint8Array(0x104);
        for(let i=0; i < 0x104; i++)
            this._bin[i] = binary[i];
        this._posBox = posBox || null;
        this._offset = Memory.PK6.MAP;
    }

    get binary() {
        this.FixChk();
        return this._bin.slice(0);
    }

    SaveToFile(path) {
        this.FixChk();
        fs.writeFileSync(path, String.fromCharCode.apply(null, this._bin), 'binary');
    }

    FixChk() {
        this._bin = Encryption.PK6.fixChk(this._bin);
    }

    get LoadPos() {
        return this._posBox;
    }

    _setIVs(ivs, isEgg, isNicknamed) {
        let current = this._getIVs();
        let IVs = ivs || {};
        let is_Egg = isEgg || current.is_egg;
        let is_nicknamed = isNicknamed || current.is_nicknamed;
        let IV32 = new Uint32Array(1);
        IV32[0] = IVs.hp || current.hp & 0x1F;
        IV32[0] |= (((IVs.attack || current.attack) & 0x1F) << 5);
        IV32[0] |= (((IVs.defense || current.defense) & 0x1F) << 10);
        IV32[0] |= (((IVs.speed || current.speed) & 0x1F) << 15);
        IV32[0] |= (((IVs.specialattack || current.specialattack) & 0x1F) << 20);
        IV32[0] |= (((IVs.specialdefense || current.specialdefense) & 0x1F) << 25);
        IV32[0] |= ((is_Egg? 1 : 0) << 30);
        IV32[0] |= ((is_nicknamed? 1 : 0) << 31);
        let u8a = new Uint8Array(IV32.buffer);
        Memory.RW.setValueAt(this._offset.INDIVIDUAL_VALUES, u8a, this._bin);
        return true;
    }

    _getIVs() {
        let memory = Memory.RW.getValueAt(this._offset.INDIVIDUAL_VALUES, this._bin);
        let u32a = new Uint32Array(memory.buffer);
        let ivs = {};
        ivs.hp = (u32a[0] & 0x1F);
        ivs.attack = (u32a[0] >> 5) & 0x1F;
        ivs.defense = (u32a[0] >> 10) & 0x1F;
        ivs.speed = (u32a[0] >> 15) & 0x1F;
        ivs.specialattack = (u32a[0] >> 20) & 0x1F;
        ivs.specialdefense = (u32a[0] >> 25) & 0x1F;
        ivs.is_egg = ((u32a[0] >> 30) & 1);
        ivs.is_nicknamed = ((u32a[0] >> 31));
        return ivs;
    }

    GetNationalID() {
        let memory = Memory.RW.getValueAt(this._offset.NATIONAL_POKEDEX_ID, this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    SetNationalID(pokedexId) {
        let buffer = new Uint16Array([pokedexId]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(this._offset.NATIONAL_POKEDEX_ID, memory, this._bin);
    }

    GetHeldItem() {
        let memory = Memory.RW.getValueAt(this._offset.HELD_ITEM, this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    SetHeldItem(item) {
        let buffer = new Uint16Array([item]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(this._offset.HELD_ITEM, memory, this._bin);
    }

    GetTID() {
        let memory = Memory.RW.getValueAt(this._offset.OT_ID, this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    SetTID(otID) {
        let buffer = new Uint16Array([otID]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(this._offset.OT_ID, memory, this._bin);
    }

    GetSID() {
        let memory = Memory.RW.getValueAt(this._offset.OT_SECRET_ID, this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    SetSID(otdid) {
        let buffer = new Uint16Array([otdid]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(this._offset.OT_SECRET_ID, memory, this._bin);
    }

    GetExperience() {
        let memory = Memory.RW.getValueAt(this._offset.EXP_POINTS, this._bin);
        let u32a = new Uint32Array(memory.buffer);
        return u32a[0];
    }
    SetExperience(exp) {
        let buffer = new Uint32Array([exp]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(this._offset.EXP_POINTS, memory, this._bin);
    }
    
    GetAbility() {
        let memory = Memory.RW.getValueAt(this._offset.ABILITY, this._bin);
        return memory[0];
    }
    SetAbility(ability) {
        let buffer = new Uint8Array([ability]);
        Memory.RW.setValueAt(this._offset.ABILITY, buffer, this._bin);
    }

    GetAbilityNum() {
        let memory = Memory.RW.getValueAt(this._offset.ABILITY, this._bin);
        return memory[0];
    }
    SetAbilityNum(num) {
        let buffer = new Uint8Array([num]);
        Memory.RW.setValueAt(this._offset.ABILITY, buffer, this._bin);
    }

    GetNickName() {
        let memory = Memory.RW.getValueAt(this._offset.NICKNAME, this._bin);
        return String.fromCharCode.apply(null, memory);
    }
    SetNickName(nickname) {
        let u16a = new Uint16Array(9);
        for (var i = 0; i < nickname.length; ++i) {
            u16a[i] = nickname.charCodeAt(i);
        }
        let u8a = new Uint8Array(u16a.buffer);
        Memory.RW.setValueAt(this._offset.NICKNAME, u8a, this._bin);
        this.SetIsNicknamed(true);
    }

    GetEVs() {
        let memoryHP = Memory.RW.getValueAt(this._offset.EV_HP, this._bin);
        let memoryATTACK = Memory.RW.getValueAt(this._offset.EV_ATTACK, this._bin);
        let memoryDEFENSE = Memory.RW.getValueAt(this._offset.EV_DEFENSE, this._bin);
        let memorySPECIALATTACK = Memory.RW.getValueAt(this._offset.EV_SPECIALATTACK, this._bin);
        let memorySPECIALDEFENSE = Memory.RW.getValueAt(this._offset.EV_SPECIALDEFENSE, this._bin);
        let memorySPEED = Memory.RW.getValueAt(this._offset.EV_SPEED, this._bin);
        let evs = {};
        evs.hp = memoryHP[0];
        evs.attack = memoryATTACK[0];
        evs.defense = memoryDEFENSE[0];
        evs.specialattack = memorySPECIALATTACK[0];
        evs.specialdefense = memorySPECIALDEFENSE[0];
        evs.speed = memorySPEED[0];
        return evs;
    }
    SetEVs(evs) {
        let current = this.EVs;
        let tmpEVs = {};
        tmpEVs.hp = new Uint8Array([evs.hp || current.hp]);
        tmpEVs.attack = new Uint8Array([evs.attack || current.attack]);
        tmpEVs.defense = new Uint8Array([evs.defense || current.defense]);
        tmpEVs.speed = new Uint8Array([evs.speed || current.speed]);
        tmpEVs.specialattack = new Uint8Array([evs.specialattack || current.specialattack]);
        tmpEVs.specialdefense = new Uint8Array([evs.specialdefense || current.specialdefense]);
        Memory.RW.setValueAt(this._offset.EV_HP, tmpEVs.hp, this._bin);
        Memory.RW.setValueAt(this._offset.EV_ATTACK, tmpEVs.attack, this._bin);
        Memory.RW.setValueAt(this._offset.EV_DEFENSE, tmpEVs.defense, this._bin);
        Memory.RW.setValueAt(this._offset.EV_SPEED, tmpEVs.speed, this._bin);
        Memory.RW.setValueAt(this._offset.EV_SPECIALATTACK, tmpEVs.specialattack, this._bin);
        Memory.RW.setValueAt(this._offset.EV_SPECIALDEFENSE, tmpEVs.specialdefense, this._bin);
    }

    GetIVs() {
        let iv = this._getIVs();
        delete iv.is_egg;
        delete iv.is_nicknamed;
        return iv;
    }
    SetIVs(ivs) {
        this._setIVs(ivs);
    }

    GetIsNicknamed() {
        let iv = this._getIVs();
        return iv.is_nicknamed? true : false;
    }
    SetIsNicknamed(is_nicknamed) {
        this._setIVs(null, null, is_nicknamed);
    }

    GetIsEgg() {
        let iv = this._getIVs();
        return iv.is_nicknamed? true : false;
    }
    SetIsEgg(is_egg) {
        this._setIVs(null, is_egg);
    }

    GetMoveID(pos) {
        let memory = Memory.RW.getValueAt(this._offset['MOVE_ID_' + pos], this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    SetMoveID(pos, id) {
        let buffer = new Uint16Array([id]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(this._offset['MOVE_ID_' + pos], memory, this._bin);
    }
    
    GetMovePP(pos) {
        let memory = Memory.RW.getValueAt(this._offset['MOVE_PP_' + pos], this._bin);
        return memory[0];
    }
    SetMovePP(pos, id) {
        let buffer = new Uint8Array([id]);
        Memory.RW.setValueAt(this._offset['MOVE_PP_' + pos], buffer, this._bin);
    }

    GetMovePPUPS(pos) {
        let memory = Memory.RW.getValueAt(this._offset['MOVE_PPUPS_' + pos], this._bin);
        return memory[0];
    }
    SetMovePPUPS(pos, id) {
        let buffer = new Uint8Array([id]);
        Memory.RW.setValueAt(this._offset['MOVE_PPUPS_' + pos], buffer, this._bin);
    }

    GetMoveRelearn(pos) {
        let memory = Memory.RW.getValueAt(this._offset['MOVE_RELEARN_' + pos], this._bin);
        let u16a = new Uint16Array(memory.buffer);
        return u16a[0];
    }
    SetMoveRelearn(pos, id) {
        let buffer = new Uint16Array([id]);
        let memory = new Uint8Array(buffer.buffer);
        Memory.RW.setValueAt(this._offset['MOVE_RELEARN_' + pos], memory, this._bin);
    }
}

module.exports = PK6;