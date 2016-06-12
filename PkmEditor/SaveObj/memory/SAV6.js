XYMap = {
    BOX: {address: 0x22600, bits: 0x34AD0},
    TRAINER_CARD: {address: 0x14000, bits: 0x170} //only make TID, SID
    // Party = 0x14200;
    // BattleBox = 0x04A00;
    // Daycare = 0x1B200;
    // GTS = 0x17800;
    // Fused = 0x16000;
    // SUBE = 0x1D890;
    // Puff = 0x00000;
    // Item = 0x00400;
    // Items = new Inventory(Item, 0);
    // AdventureInfo = 0x01200;
    // Trainer1 = 0x1400;
    // Trainer2 = 0x4200;
    // PCLayout = 0x4400;
    // PCBackgrounds = PCLayout + 0x41E;
    // PCFlags = PCLayout + 0x43D;
    // WondercardFlags = 0x1BC00;
    // WondercardData = WondercardFlags + 0x100;
    // BerryField = 0x1B800;
    // OPower = 0x16A00;
    // EventConst = 0x14A00;
    // EventAsh = -1;
    // EventFlag = EventConst + 0x2FC;
    // PokeDex = 0x15000;
    // PokeDexLanguageFlags = PokeDex + 0x3C8;
    // Spinda = PokeDex + 0x648;
    // EncounterCount = -1;
    // HoF = 0x19400;
    // SuperTrain = 0x1F200;
    // JPEG = 0x57200;
    // MaisonStats = 0x1B1C0;
    // PSS = 0x05000;
    // PSSStats = 0x1E400;
    // BoxWallpapers = 0x481E;
    // SecretBase = -1;
    // EonTicket = -1;
    // Contest = -1;
    // PlayTime = 0x1800;
    // Accessories = 0x1A00;
    // LastViewedBox = PCLayout + 0x43F;
    // ItemInfo = 0x1000;
};

ORASMap ={
    BOX: {address: 0x33000, bits: 0x34AD0},
    TRAINER_CARD: {address: 0x14000, bits: 0x170}
    // Party = 0x14200; // Confirmed
    // BattleBox = 0x04A00; // Confirmed
    // Daycare = 0x1BC00; // Confirmed (thanks Rei)
    // GTS = 0x18200; // Confirmed
    // Fused = 0x16A00; // Confirmed
    // SUBE = 0x1D890; // ****not in use, not updating?****
    // Puff = 0x00000; // Confirmed
    // Item = 0x00400; // Confirmed
    // Items = new Inventory(Item, 1);
    // AdventureInfo = 0x01200;
    // Trainer1 = 0x01400; // Confirmed
    // Trainer2 = 0x04200; // Confirmed
    // PCLayout = 0x04400; // Confirmed
    // PCBackgrounds = PCLayout + 0x41E;
    // PCFlags = PCLayout + 0x43D;
    // WondercardFlags = 0x1CC00; // Confirmed
    // WondercardData = WondercardFlags + 0x100;
    // BerryField = 0x1C400; // ****changed****
    // OPower = 0x17400; // ****changed****
    // EventConst = 0x14A00;
    // EventAsh = EventConst + 0x78;
    // EventFlag = EventConst + 0x2FC;
    // PokeDex = 0x15000;
    // Spinda = PokeDex + 0x680;
    // EncounterCount = PokeDex + 0x686;
    // PokeDexLanguageFlags = PokeDex + 0x400;
    // HoF = 0x19E00; // Confirmed
    // SuperTrain = 0x20200;
    // Contest = 0x23600; // Confirmed
    // JPEG = 0x67C00; // Confirmed
    // MaisonStats = 0x1BBC0;
    // PSS = 0x05000; // Confirmed (thanks Rei)
    // PSSStats = 0x1F400;
    // BoxWallpapers = 0x481E;
    // SecretBase = 0x23A00;
    // EonTicket = 0x319B8;
    // PlayTime = 0x1800;
    // Accessories = 0x1A00;
    // LastViewedBox = PCLayout + 0x43F;
    // ItemInfo = 0x1000;
};

module.exports = {
    MAP:{
        XY: XYMap,
        ORAS: ORASMap
    }
};
