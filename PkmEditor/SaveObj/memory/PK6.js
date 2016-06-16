
let map = {

    // 0x00-0x03	Encryption Key
    // 0x04-0x05	Sanity Placeholder
    // 0x06-0x07	Checksum

    /* Block A (0x8 - 0x3F) */

    NATIONAL_POKEDEX_ID: { address: 0x8, bits: 0x2 },
    HELD_ITEM: { address: 0xA, bits: 0x2 },
    OT_ID: { address: 0x0C, bits: 0x2 },
    OT_SECRET_ID: { address: 0x0E, bits: 0x2 },
    EXP_POINTS: { address: 0x10, bits: 0x4 },
    ABILITY: { address: 0x14, bits: 0x1 },
    ABILITY_NUM: { address: 0x15, bits: 0x1 },

    // missing 0x16 - 0x17

    PERSONALITY_VALUE: { address: 0x18, bits: 0x4 },
    // NATURE: { address: 0x1C, bits: 0x1 },

    // ENCOUNTER_FLAGS: { address: 0x1D, bits: 0x1 },

    EV_HP: { address: 0x1E, bits: 0x1 },
    EV_ATTACK: { address: 0x1F, bits: 0x1 },
    EV_DEFENSE: { address: 0x20, bits: 0x1 },
    EV_SPEED: { address: 0x21, bits: 0x1 },
    EV_SPECIALATTACK: { address: 0x22, bits: 0x1 },
    EV_SPECIALDEFENSE: { address: 0x23, bits: 0x1 },

    // CONTEST_COOL: { address: 0x24, bits: 0x1 },
    // CONTEST_BEAUTY: { address: 0x25, bits: 0x1 },
    // CONTEST_CUTE: { address: 0x26, bits: 0x1 },
    // CONTEST_TOUGH: { address: 0x27, bits: 0x1 },
    // CONTEST_SHEEN: { address: 0x28, bits: 0x1 },

    // MARKINGS: { address: 0x29, bits: 0x1 },

    // POKERUS: { address: 0x2B, bits: 0x1 },

    // SUPERTRAINING_GOLD_FLAGS: { address: 0x2C, bits: 0x4 },
    // RIBBONS: { address: 0x30, bits: 0x6 },
    // RIBBON_STATS: { address: 0x36, bits: 0x2 },
    // SUPERTRAINING_DISTRIBUTION_FLAGS: { address: 0x3A, bits: 0x1 },

    /* Block B (0x40 - 0x77) */

    NICKNAME: { address: 0x40, bits: 0x12 },
    MOVE_ID_1: { address: 0x5A, bits: 0x2 },
    MOVE_ID_2: { address: 0x5C, bits: 0x2 },
    MOVE_ID_3: { address: 0x5E, bits: 0x2 },
    MOVE_ID_4: { address: 0x60, bits: 0x2 },
    MOVE_PP_1: { address: 0x62, bits: 0x1 },
    MOVE_PP_2: { address: 0x63, bits: 0x1 },
    MOVE_PP_3: { address: 0x64, bits: 0x1 },
    MOVE_PP_4: { address: 0x65, bits: 0x1 },
    MOVE_PPUPS_1: { address: 0x66, bits: 0x1 },
    MOVE_PPUPS_2: { address: 0x67, bits: 0x1 },
    MOVE_PPUPS_3: { address: 0x68, bits: 0x1 },
    MOVE_PPUPS_4: { address: 0x69, bits: 0x1 },
    MOVE_RELEARN_1: { address: 0x6A, bits: 0x2 },
    MOVE_RELEARN_2: { address: 0x6C, bits: 0x2 },
    MOVE_RELEARN_3: { address: 0x6E, bits: 0x2 },
    MOVE_RELEARN_4: { address: 0x70, bits: 0x2 },
    // SUPERTRAINING_MISSIONFLAG: { address: 0x72, bits: 0x1 },

    INDIVIDUAL_VALUES: { address: 0x74, bits: 0x4 },
    //export const IV_ATTACK,
    //export const IV_DEFENSE,
    //export const IV_SPEED,
    //export const IV_SPECIALATTACK,
    //export const IV_SPECIALDEFENSE,
    //export const IS_EGG,
    //export const IS_NICKNAMED

    /* Block C (0x78 - 0xAF) */

    // LH_NICKNAME: { address: 0x78, bits: 0x12 },
    // LH_GENDER: { address: 0x92, bits: 0x1 },
    // CURRENT_HANDLER: { address: 0x93, bits: 0x1 },
    // GEOLOC_1: { address: 0x94, bits: 0x2 },
    // GEOLOC_2: { address: 0x96, bits: 0x2 },
    // GEOLOC_3: { address: 0x98, bits: 0x2 },
    // GEOLOC_4: { address: 0x9A, bits: 0x2 },
    // GEOLOC_5: { address: 0x9C, bits: 0x2 },

    // LH_FRIENDSHIP: { address: 0xA2, bits: 0x1 },
    // LH_AFFECTION: { address: 0xA3, bits: 0x1 },
    // LH_MEMORY_INTENSITY: { address: 0xA4, bits: 0x1 },
    // LH_MEMORY_LINE: { address: 0xA5, bits: 0x1 },
    // LH_MEMORY_FEELING: { address: 0xA6, bits: 0x1 },

    // LH_MEMORY_TEXT: { address: 0xA8, bits: 0x2 },

    // AMIE_FULLNESS: { address: 0xAE, bits: 0x1 },
    // AMIE_ENJOYMENT: { address: 0xAF, bits: 0x1 },

    /* Block D (0xB0 - 0xE7) */

    // OT_NICKNAME: { address: 0xB0, bits: 0x12 },
    // OT_FRIENDSHIP: { address: 0xCA, bits: 0x1 },
    // OT_AFFECTION: { address: 0xCB, bits: 0x1 },
    // OT_MEMORY_INTENSITY: { address: 0xCC, bits: 0x1 },
    // OT_MEMORY_LINE: { address: 0xCD, bits: 0x1 },
    // OT_MEMORY_TEXT: { address: 0xCE, bits: 0x2 },
    // OT_MEMORY_FEELING: { address: 0xD0, bits: 0x1 },
    // EGG_MET_DATE: { address: 0xD1, bits: 0x3 },
    // MET_DATE: { address: 0xD4, bits: 0x3 },

    // EGG_MET_LOCATION: { address: 0xD8, bits: 0x2 },
    // MET_LOCATION: { address: 0xDA, bits: 0x2 },

    // POKEBALL: { address: 0xDC, bits: 0x1 },
    // ENCOUNTER_OT_GENDER: { address: 0xDD, bits: 0x1 },
    // ENCOUNTER_TYPE: { address: 0xDE, bits: 0x1 },
    // OT_GAME_ID: { address: 0xDF, bits: 0x1 },
    // COUNTRY_ID: { address: 0xE0, bits: 0x1 },
    // REGION_ID: { address: 0xE1, bits: 0x1 },
    // REGION_3DS_ID: { address: 0xE2, bits: 0x1 },
    // OT_LANGUAGE_ID: { address: 0xE3, bits: 0x1 }
};

module.exports = {};
module.exports.MAP = map;