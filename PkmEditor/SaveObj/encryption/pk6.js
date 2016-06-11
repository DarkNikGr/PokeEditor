const cuint = require("cuint");
let mul_const = cuint.UINT32(1103515245);
let add_const = cuint.UINT32(24691);

let cuintNext = (seed) => {
    return cuint.UINT32(seed).multiply(mul_const).add(add_const).toNumber() >>> 0;
};

let copy = (src, off1, dest, off2, length) => {
    let totalOffset1 = off1 + src.byteOffset;
    let totalOffset2 = off2 + dest.byteOffset;
    let lower4Bound = Math.min(-totalOffset1 & 3, length);
    let upper4Bound = Math.min(length & ~3 + lower4Bound, length);
    if (((totalOffset1 - totalOffset2) & 3) !== 0 || lower4Bound >= upper4Bound) {
        for (let i = 0; i < length; ++i) {
            dest[i + off2] = src[i + off1];
        }
    }
    else {
        for (let i = 0; i < lower4Bound; ++i) {
            dest[i + off2] = src[i + off1];
        }
        let intermediate4Length = (upper4Bound - lower4Bound) >> 2;
        let src_32 = new Uint32Array(src.buffer, totalOffset1 + lower4Bound, intermediate4Length);
        let dest_32 = new Uint32Array(dest.buffer, totalOffset2 + lower4Bound, intermediate4Length);
        for (let i = 0; i < intermediate4Length; ++i) {
            dest_32[i] = src_32[i];
        }
        for (let i = upper4Bound; i < length; ++i) {
            dest[i + off2] = src[i + off1];
        }
    }
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
    copy(pkx, 0, ekx, 0, 8);
    let shuffle = deshuffleloc[sv];
    for (let b = 0; b < 4; b++)
        copy(pkx, 8 + 56 * shuffle[b], ekx, 8 + 56 * b, 56);
    if (pkx.length > 232)
        copy(pkx, 232, ekx, 232, 28);
    return ekx;
};

let shuffle = (pkx, sv) => {
    let ekx = new Uint8Array(pkx.length);
    copy(ekx, 0, pkx, 0, ekx.length);
    let shuffle = shuffleloc[sv];
    for (let b = 0; b < 4; b++)
        copy(pkx, 8 + 56 * shuffle[b], ekx, 8 + 56 * b, 56);
    if (pkx.length > 232)
        copy(pkx, 232, ekx, 232, 28);
    return ekx;
};

let decrypt = (ekx) => {
    let pkx = new Uint8Array(ekx.length);
    copy(ekx, 0, pkx, 0, ekx.length);
    let pv = new DataView(pkx.buffer, pkx.byteOffset, pkx.byteLength).getUint32(0, true);
    let sv = (((pv & 0x3E000) >> 0xD) % 24);
    let seed = pv;
    // let pkx16 = util.createUint16Array(pkx);
    let pkx16 = new Uint16Array(pkx.buffer, pkx.byteOffset, pkx.byteLength >> 1);
    for (let i = 4; i < 232 / 2; ++i) {
        seed = cuintNext(seed);
        pkx16[i] ^= ((seed >> 0x10) & 0xFFFF);
    }
    seed = pv;
    if (pkx.length > 232) {
        for (let i = 232 / 2; i < 260 / 2; ++i) {
            seed = cuintNext(seed);
            pkx16[i] ^= ((seed >> 16) & 0xFFFF);
        }
    }
    pkx = deshuffle(pkx, sv);
    return pkx;
};

let encrypt = (pkx) => {
    let ekx = new Uint8Array(pkx.length);
    copy(pkx, 0, ekx, 0, ekx.length);
    let pv = new DataView(pkx.buffer, pkx.byteOffset, pkx.byteLength).getUint32(0, true);
    let sv = (((pv & 0x3E000) >> 0xD) % 24);
    ekx = shuffle(ekx, sv);
    let seed = pv;
    let ekx16 = new Uint16Array(ekx.buffer, ekx.byteOffset, ekx.byteLength >> 1);
    for (let i = 4; i < 232 / 2; ++i) {
        seed = cuintNext(seed);
        ekx16[i] ^= ((seed >> 16) & 0xFFFF);
    }
    seed = pv;
    if (pkx.length > 232) {
        for (let i = 232 / 2; i < 260 / 2; ++i) {
            seed = cuintNext(seed);
            ekx16[i] ^= ((seed >> 16) & 0xFFFF);
        }
    }
    return ekx;
};

let fixChk = (pkx) => {
    let chk = 0;
    let pkx16 = new Uint16Array(pkx.buffer, pkx.byteOffset, pkx.byteLength >> 1);
    for (let i = 8 / 2; i < 232 / 2; i++) {
        chk += pkx16[i];
    }
    pkx16[6 / 2] = chk & 0xFFFF;
};

let verifyChk = (pkx) => {
    let chk = 0;
    let pkx16 = new Uint16Array(pkx.buffer, pkx.byteOffset, pkx.byteLength >> 1);
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