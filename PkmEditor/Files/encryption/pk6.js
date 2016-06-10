const cuint = require("cuint");
var mul_const = cuint.UINT32(1103515245);
var add_const = cuint.UINT32(24691);

let next = (seed) => {
    return cuint.UINT32(seed).multiply(mul_const).add(add_const).toNumber() >>> 0;
};

let deshuffleloc = [
    [ 0, 1, 2, 3 ],
    [ 0, 1, 3, 2 ],
    [ 0, 2, 1, 3 ],
    [ 0, 3, 1, 2 ],
    [ 0, 2, 3, 1 ],
    [ 0, 3, 2, 1 ],
    [ 1, 0, 2, 3 ],
    [ 1, 0, 3, 2 ],
    [ 2, 0, 1, 3 ],
    [ 3, 0, 1, 2 ],
    [ 2, 0, 3, 1 ],
    [ 3, 0, 2, 1 ],
    [ 1, 2, 0, 3 ],
    [ 1, 3, 0, 2 ],
    [ 2, 1, 0, 3 ],
    [ 3, 1, 0, 2 ],
    [ 2, 3, 0, 1 ],
    [ 3, 2, 0, 1 ],
    [ 1, 2, 3, 0 ],
    [ 1, 3, 2, 0 ],
    [ 2, 1, 3, 0 ],
    [ 3, 1, 2, 0 ],
    [ 2, 3, 1, 0 ],
    [ 3, 2, 1, 0 ]
];

let shuffleloc = [
    [ 0, 1, 2, 3 ],
    [ 0, 1, 3, 2 ],
    [ 0, 2, 1, 3 ],
    [ 0, 2, 3, 1 ],
    [ 0, 3, 1, 2 ],
    [ 0, 3, 2, 1 ],
    [ 1, 0, 2, 3 ],
    [ 1, 0, 3, 2 ],
    [ 1, 2, 0, 3 ],
    [ 1, 2, 3, 0 ],
    [ 1, 3, 0, 2 ],
    [ 1, 3, 2, 0 ],
    [ 2, 0, 1, 3 ],
    [ 2, 0, 3, 1 ],
    [ 2, 1, 0, 3 ],
    [ 2, 1, 3, 0 ],
    [ 2, 3, 0, 1 ],
    [ 2, 3, 1, 0 ],
    [ 3, 0, 1, 2 ],
    [ 3, 0, 2, 1 ],
    [ 3, 1, 0, 2 ],
    [ 3, 1, 2, 0 ],
    [ 3, 2, 0, 1 ],
    [ 3, 2, 1, 0 ]
];

let deshuffle = (pkx, sv) => {
    let ekx = new Uint8Array(pkx.length);
    util.copy(pkx, 0, ekx, 0, 8);
    let shuffle = deshuffleloc[sv];
    for (let b = 0; b < 4; b++)
        util.copy(pkx, 8 + 56 * shuffle[b], ekx, 8 + 56 * b, 56);
    if (pkx.length > 232)
        util.copy(pkx, 232, ekx, 232, 28);
    return ekx;
};

let shuffle = (pkx, sv) => {
    let ekx = new Uint8Array(pkx.length);
    util.copy(pkx, 0, ekx, 0, 8);
    let shuffle = shuffleloc[sv];
    for (let b = 0; b < 4; b++)
        util.copy(pkx, 8 + 56 * shuffle[b], ekx, 8 + 56 * b, 56);
    if (pkx.length > 232)
        util.copy(pkx, 232, ekx, 232, 28);
    return ekx;
};

let decrypt = (ekx) => {
    let pkx = new Uint8Array(ekx.length);
    util.copy(ekx, 0, pkx, 0, ekx.length);
    let pv = new DataView(pkx.buffer, pkx.byteOffset, pkx.byteLength).getUint32(0, true);
    let sv = (((pv & 0x3E000) >> 0xD) % 24);
    let seed = pv;
    let pkx16 = new Uint32Array(pkx.buffer, pkx.byteOffset, pkx.byteLength >> 2);
    for (let i = 4; i < 232 / 2; ++i) {
        seed = util.LCRNG.next(seed);
        pkx16[i] ^= ((seed >> 0x10) & 0xFFFF);
    }
    seed = pv;
    if (pkx.length > 232) {
        for (let i = 232 / 2; i < 260 / 2; ++i) {
            seed = util.LCRNG.next(seed);
            pkx16[i] ^= ((seed >> 16) & 0xFFFF);
        }
    }
    pkx = deshuffle(pkx, sv);
    return pkx;
};

let encrypt = (pkx) => {
    let ekx = new Uint8Array(pkx.length);
    util.copy(pkx, 0, ekx, 0, ekx.length);
    let pv = new DataView(pkx.buffer, pkx.byteOffset, pkx.byteLength).getUint32(0, true);
    let sv = (((pv & 0x3E000) >> 0xD) % 24);
    ekx = shuffle(ekx, sv);
    let seed = pv;
    let ekx16 = new Uint32Array(ekx.buffer, ekx.byteOffset, ekx.byteLength >> 2);
    for (let i = 4; i < 232 / 2; ++i) {
        seed = util.LCRNG.next(seed);
        ekx16[i] ^= ((seed >> 16) & 0xFFFF);
    }
    seed = pv;
    if (pkx.length > 232) {
        for (let i = 232 / 2; i < 260 / 2; ++i) {
            seed = util.LCRNG.next(seed);
            ekx16[i] ^= ((seed >> 16) & 0xFFFF);
        }
    }
    return ekx;
};

let fixChk = (pkx) => {
    let chk = 0;
    let pkx16 = new Uint32Array(pkx.buffer, pkx.byteOffset, pkx.byteLength >> 2);
    for (let i = 8 / 2; i < 232 / 2; i++) {
        chk += pkx16[i];
    }
    pkx16[6 / 2] = chk & 0xFFFF;
};

let verifyChk = (pkx) => {
    let chk = 0;
    let pkx16 = new Uint32Array(pkx.buffer, pkx.byteOffset, pkx.byteLength >> 2);
    for (let i = 8 / 2; i < 232 / 2; i++) {
        chk += pkx16[i];
    }
    let actualsum = pkx16[6 / 2];
    if (pkx16[8 / 2] > 750 || pkx16[0x90 / 2] != 0)
        return false;
    return (chk & 0xFFFF) == actualsum;
};

module.exports = {
    decrypt: decrypt,
    encrypt: encrypt,
    fixChk: fixChk,
    verifyChk: verifyChk
};