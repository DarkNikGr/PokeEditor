XYMap = {};

// Array { address: address, bits: bits]
XYMap.INVENTORY_POKEPUFFS = { address: 0x5400, bits: 1};
XYMap.POCKET_ITEMS = { address: 0x5800, bits: 0x640};
XYMap.POCKET_KEY_ITEMS = { address: 0x05E40, bits: 0x180};
XYMap.POCKET_TMS = { address: 0x05FC0, bits: 0x180};
XYMap.POCKET_MEDICINE = { address: 0x06168, bits: 0x1A8};
XYMap.POCKET_BERRIES = { address: 0x06268, bits: 0x100};
XYMap.QUICK_ACCESS_ITEMS = { address: 0x06400, bits: 0x2C};
XYMap.TRAINER_STATS = { address: 0x6400, bits: 0x150};
XYMap.MAP_ID = { address: 0x06802, bits: 2};
XYMap.MAP_X_COORDINATE = { address: 0x06810, bits: 4};
XYMap.MAP_Y_COORDINATE = { address: 0x06814, bits: 4};
XYMap.MAP_Z_COORDINATE = { address: 0x06818, bits: 4};
// map data is stored twice
XYMap.MAP_ID_2 = { address: 0x068F4, bits: 2};
XYMap.MAP_X_COORDINATE_2 = { address: 0x06904, bits: 4};
XYMap.MAP_Y_COORDINATE_2 = { address: 0x06808, bits: 4};
XYMap.MAP_Z_COORDINATE_2 = { address: 0x0680C, bits: 4};
XYMap.PLAY_TIME = { address: 0x06C00, bits: 8};
XYMap.WARDROBES = { address: 0x06E00, bits: 0x1C0};
XYMap.WORLD_DATA = { address: 0x07400, bits: 0x2100};
XYMap.TRAINER_INFORAMTION = { address: 0x09600, bits: 0x140};
XYMap.BOX_METADATA = { address: 0x09800, bits: 0x440};
XYMap.BATTLE_BOX = { address: 0x09E00, bits: 0x574};
XYMap.PSS_DATA_FRIENDS = { address: 0x0A400, bits: 0x4E28};
XYMap.PSS_DATA_ACQUAINTANCES = { address: 0x0F400, bits: 0x4E28};
XYMap.PSS_DATA_PASSERBY = { address: 0x14400, bits: 0x4E28};
XYMap.TRAINER_CARD = { address: 0x19400, bits: 0x170};
XYMap.PARTY_POKEMON = { address: 0x19600, bits: 0x61C};
XYMap.EVENT_FLAGS = { address: 0x19E00, bits: 0x504};
XYMap.POKEDEX = { address: 0x1A400, bits: 0x6A0};
XYMap.ZEKROM_RESHIRAM_DATA = { address: 0x1B400, bits: 0x104};
XYMap.OPOWER_FLAGS = { address: 0x1BE00, bits: 0x64};
XYMap.PLAYER_METADATA = { address: 0x1C400, bits: 0x70C};
XYMap.CACHED_GTS_DATA = { address: 0x1CC00, bits: 0x180};
XYMap.WILD_ENCOUNTER_DATA = { address: 0x1D200, bits: 0x48};
XYMap.TOURNAMENT_WIFI_DATA = { address: 0x1D600, bits: 0x644};
XYMap.TOURNAMENT_LIVE_DATA = { address: 0x1DE00, bits: 0x5C8};
XYMap.NETWORK_DATA = { address: 0x1E400, bits: 0x2F8};
XYMap.HALL_OF_FAME_DATA = { address: 0x1E800, bits: 0x1B40};
XYMap.BATTLE_MAISON_DATA = { address: 0x20400, bits: 0x1F4};
XYMap.DAY_CARE_DATA = { address: 0x20600, bits: 0x1F0};
XYMap.BERRY_DATA = { address: 0x20C00, bits: 0x390};
XYMap.WONDERCARD_DATA = { address: 0x21000, bits: 0x1A90};
XYMap.ANISTAR_OLD_MAN_STORAGE = { address: 0x22C00, bits: 0x308};
XYMap.FRIEND_SAFARI_DATA = { address: 0x23000, bits: 0x618};
XYMap.PSS_DATA_EXTRA = { address: 0x23800, bits: 0x25C};
XYMap.PSS_DATA_FRIENDS_EXTRA = { address: 0x23C00, bits: 0x834};
XYMap.SUPER_TRAINING_DATA = { address: 0x24600, bits: 0x318};
XYMap.POKEMON_BANK_GIFTS = { address: 0x25200, bits: 0xC48};
XYMap.POKEMON_GLOBAL_LINK_GIFTS = { address: 0x26200, bits: 0x200};
XYMap.BOX_DATA = { address: 0x27A00, bits: 0x34AD0};
XYMap.POKEMON_GLOBAL_LINK_PICTURES = { address: 0x26200, bits: 0x200};
XYMap.CHECKSUM = { address: 0x6A800, bits: 0x800};

ORASMap ={};

// Array { address: address, bits: bits]
ORASMap.INVENTORY_POKEPUFFS = { address: 0x5400, bits: 0x2C8};

ORASMap.POCKET_ITEMS = { address: 0x5800, bits: 0x640};
ORASMap.POCKET_KEY_ITEMS = { address: 0x05E40, bits: 0x180};
ORASMap.POCKET_TMS = { address: 0x05FC0, bits: 0x180};
ORASMap.POCKET_MEDICINE = { address: 0x06168, bits: 0x1A8};
ORASMap.POCKET_BERRIES = { address: 0x06268, bits: 0x100};

ORASMap.QUICK_ACCESS_ITEMS = { address: 0x06400, bits: 0x2C};

ORASMap.TRAINER_STATS = { address: 0x6400, bits: 0x150};

ORASMap.MAP_ID = { address: 0x06802, bits: 2};
ORASMap.MAP_X_COORDINATE = { address: 0x06810, bits: 4};
ORASMap.MAP_Y_COORDINATE = { address: 0x06814, bits: 4};
ORASMap.MAP_Z_COORDINATE = { address: 0x06818, bits: 4};
// map data is stored twice
ORASMap.MAP_ID_2 = { address: 0x068F4, bits: 2};
ORASMap.MAP_X_COORDINATE_2 = { address: 0x06904, bits: 4};
ORASMap.MAP_Y_COORDINATE_2 = { address: 0x06808, bits: 4};
ORASMap.MAP_Z_COORDINATE_2 = { address: 0x0680C, bits: 4};

ORASMap.PLAY_TIME = { address: 0x06C00, bits: 8};

ORASMap.WARDROBES = { address: 0x06E00, bits: 0x1C0};

ORASMap.WORLD_DATA = { address: 0x07400, bits: 0x2100};

ORASMap.TRAINER_INFORAMTION = { address: 0x09600, bits: 0x140};
ORASMap.BOX_METADATA = { address: 0x09800, bits: 0x440};
ORASMap.BATTLE_BOX = { address: 0x09E00, bits: 0x574};
ORASMap.PSS_DATA_FRIENDS = { address: 0x0A400, bits: 0x4E28};
ORASMap.PSS_DATA_ACQUAINTANCES = { address: 0x0F400, bits: 0x4E28};
ORASMap.PSS_DATA_PASSERBY = { address: 0x14400, bits: 0x4E28};

ORASMap.TRAINER_CARD = { address: 0x19400, bits: 0x170};

ORASMap.PARTY_POKEMON = { address: 0x19600, bits: 0x61C};

ORASMap.EVENT_FLAGS = { address: 0x19E00, bits: 0x504};

ORASMap.POKEDEX = { address: 0x1A400, bits: 0x6A0};

ORASMap.ZEKROM_RESHIRAM_DATA = { address: 0x1B400, bits: 0x104};

ORASMap.OPOWER_FLAGS = { address: 0x1BE00, bits: 0x64};

ORASMap.PLAYER_METADATA = { address: 0x1C400, bits: 0x70C};

ORASMap.CACHED_GTS_DATA = { address: 0x1CC00, bits: 0x180};

ORASMap.WILD_ENCOUNTER_DATA = { address: 0x1D200, bits: 0x48};

ORASMap.TOURNAMENT_WIFI_DATA = { address: 0x1D600, bits: 0x644};
ORASMap.TOURNAMENT_LIVE_DATA = { address: 0x1DE00, bits: 0x5C8};

ORASMap.NETWORK_DATA = { address: 0x1E400, bits: 0x2F8};

ORASMap.HALL_OF_FAME_DATA = { address: 0x1E800, bits: 0x1B40};

ORASMap.BATTLE_MAISON_DATA = { address: 0x20400, bits: 0x1F4};

ORASMap.DAY_CARE_DATA = { address: 0x20600, bits: 0x1F0};

ORASMap.BERRY_DATA = { address: 0x20C00, bits: 0x390};

ORASMap.WONDERCARD_DATA = { address: 0x21000, bits: 0x1A90};

ORASMap.ANISTAR_OLD_MAN_STORAGE = { address: 0x22C00, bits: 0x308};

ORASMap.FRIEND_SAFARI_DATA = { address: 0x23000, bits: 0x618};

ORASMap.PSS_DATA_EXTRA = { address: 0x23800, bits: 0x25C};
ORASMap.PSS_DATA_FRIENDS_EXTRA = { address: 0x23C00, bits: 0x834};

ORASMap.SUPER_TRAINING_DATA = { address: 0x24600, bits: 0x318};

ORASMap.POKEMON_BANK_GIFTS = { address: 0x25200, bits: 0xC48};

ORASMap.POKEMON_GLOBAL_LINK_GIFTS = { address: 0x26200, bits: 0x200};
ORASMap.BOX_DATA = { address: 0x38400, bits: 0x34AD0};

module.exports = {
    XY: XYMap,
    ORAS: ORASMap
};
