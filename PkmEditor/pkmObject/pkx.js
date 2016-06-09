let Memory = require('./../memory');

class PKX {
    constructor(binary) {
        this._bin = binary;
    }

    _setIVs(IVs, isEgg, isNicknamed) {
        let offset = Memory.pkx.INDIVIDUAL_VALUES;
        let current_data = this.GetIndividualValues();
        let IV32 = new Uint32Array(1);
        let IV_HP = IVs.hp || current_data.hp;
        let IV_Attack = IVs.attack || current_data.attack;
        let IV_Defense = IVs.defense || current_data.defense;
        let IV_Speed = IVs.speed || current_data.speed;
        let IV_SpecialAttack = IVs.specialattack || current_data.specialattack;
        let IV_SpecialDefense = IVs.specialdefense || current_data.specialdefense;
        let Is_Egg = Number(isEgg) || current_data.is_egg;
        let Is_Nicknamed = Number(isNicknamed) || current_data.is_nicknamed;
        IV32[0] = IV_HP & 0x1F;
        IV32[0] |= ((IV_Attack & 0x1F) << 5);
        IV32[0] |= ((IV_Defense & 0x1F) << 10);
        IV32[0] |= ((IV_Speed & 0x1F) << 15);
        IV32[0] |= ((IV_SpecialAttack & 0x1F) << 20);
        IV32[0] |= ((IV_SpecialDefense & 0x1F) << 25);
        IV32[0] |= (Is_Egg << 30);
        IV32[0] |= (Is_Nicknamed << 31);
        let u8a = new Uint8Array(IV32.buffer);
        Memory.RW.setValueAt(offset.address, u8a, offset.bits, this._bin);
    }

    _getIVs() {
        let offset = Memory.pkx.map.INDIVIDUAL_VALUES;
        let memory = Memory.RW.getValueAt(offset.address, offset.bits, this._bin);
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

    get nationalID() {
        let offset = Memory.pkx.map.NATIONAL_POKEDEX_ID;
        if (offset) {
            let memory = Memory.RW.getValueAt(offset.address, offset.bits, this._bin);
            let u16a = new Uint16Array(memory.buffer);
            return u16a[0];
        } else return null;
    }
    set nationalID(pokedexId) {
        let offset = Memory.pkx.map.NATIONAL_POKEDEX_ID;
        if (offset) {
            let buffer = new Uint16Array([pokedexId]);
            let memory = new Uint8Array(buffer.buffer);
            Memory.RW.setValueAt(offset.address, memory, offset.bits, this._bin);
        } else return false;
        return true
    }
}

module.exports = PKX;