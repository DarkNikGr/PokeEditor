XYMap = {
    BOX: {address: 0x22600, bits: 0x34AD0},
    TRAINER_CARD: {address: 0x14000, bits: 0x170} //only make TID, SID
};

ORASMap ={
    BOX: {address: 0x33000, bits: 0x34AD0},
    TRAINER_CARD: {address: 0x14000, bits: 0x170}
};

module.exports = {
    MAP:{
        XY: XYMap,
        ORAS: ORASMap
    }
};
