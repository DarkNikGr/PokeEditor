const cuint = require('cuint');
let mul_const = cuint.UINT32(1103515245);
let add_const = cuint.UINT32(24691);

let cuintNext = seed => {
  return (
    cuint
      .UINT32(seed)
      .multiply(mul_const)
      .add(add_const)
      .toNumber() >>> 0
  );
};

let copy = (src, off1, dest, off2, length) => {
  let totalOffset1 = off1 + src.byteOffset;
  let totalOffset2 = off2 + dest.byteOffset;
  let lower4Bound = Math.min(-totalOffset1 & 3, length);
  let upper4Bound = Math.min(length & (~3 + lower4Bound), length);
  if (((totalOffset1 - totalOffset2) & 3) !== 0 || lower4Bound >= upper4Bound) {
    for (let i = 0; i < length; ++i) {
      dest[i + off2] = src[i + off1];
    }
  } else {
    for (let i = 0; i < lower4Bound; ++i) {
      dest[i + off2] = src[i + off1];
    }
    let intermediate4Length = (upper4Bound - lower4Bound) >> 2;
    let src_32 = new Uint32Array(
      src.buffer,
      totalOffset1 + lower4Bound,
      intermediate4Length
    );
    let dest_32 = new Uint32Array(
      dest.buffer,
      totalOffset2 + lower4Bound,
      intermediate4Length
    );
    for (let i = 0; i < intermediate4Length; ++i) {
      dest_32[i] = src_32[i];
    }
    for (let i = upper4Bound; i < length; ++i) {
      dest[i + off2] = src[i + off1];
    }
  }
};

let shuffle = (pkx, sv) => {
  let aloc = [
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    3,
    2,
    3,
    1,
    1,
    2,
    3,
    2,
    3,
    1,
    1,
    2,
    3,
    2,
    3
  ];
  let bloc = [
    1,
    1,
    2,
    3,
    2,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    3,
    1,
    1,
    3,
    2,
    2,
    3,
    1,
    1,
    3,
    2
  ];
  let cloc = [
    2,
    3,
    1,
    1,
    3,
    2,
    2,
    3,
    1,
    1,
    3,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    2,
    3,
    2,
    1,
    1
  ];
  let dloc = [
    3,
    2,
    3,
    2,
    1,
    1,
    3,
    2,
    3,
    2,
    1,
    1,
    3,
    2,
    3,
    2,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0
  ];

  let ord = [aloc[sv], bloc[sv], cloc[sv], dloc[sv]];
  let ekx = pkx.slice(0);
  for (let b = 0; b < 4; b++) {
    copy(pkx, 8 + 56 * ord[b], ekx, 8 + 56 * b, 56);
  }
  if (pkx.length > 232) copy(pkx, 232, ekx, 232, 28);
  return ekx;
};

let decrypt = ekx => {
  let pkx = ekx.slice(0);
  let pv = new Uint32Array(pkx.buffer)[0];
  let sv = ((pv & 0x3e000) >> 0xd) % 24;
  let seed = pv;
  let pkx16 = new Uint16Array(pkx.buffer, pkx.byteOffset, pkx.byteLength >> 1);
  for (let i = 4; i < 232 / 2; ++i) {
    seed = cuintNext(seed);
    pkx16[i] ^= (seed >> 0x10) & 0xffff;
  }
  seed = pv;
  if (pkx.length > 232) {
    for (let i = 232 / 2; i < 260 / 2; ++i) {
      seed = cuintNext(seed);
      pkx16[i] ^= (seed >> 16) & 0xffff;
    }
  }
  pkx = shuffle(pkx, sv);
  let pkx8a = new Uint8Array(pkx.buffer);
  return pkx8a;
};

let encrypt = pkx => {
  let ekx = pkx.slice(0);
  let pv = new Uint32Array(pkx.buffer)[0];
  let sv = ((pv & 0x3e000) >> 0xd) % 24;
  for (let i = 0; i < 11; i++) {
    ekx = shuffle(ekx, sv);
  }
  let seed = pv;
  let ekx16 = new Uint16Array(ekx.buffer, ekx.byteOffset, ekx.byteLength >> 1);
  for (let i = 4; i < 232 / 2; ++i) {
    seed = cuintNext(seed);
    ekx16[i] ^= (seed >> 16) & 0xffff;
  }
  seed = pv;
  if (pkx.length > 232) {
    for (let i = 232 / 2; i < 260 / 2; ++i) {
      seed = cuintNext(seed);
      ekx16[i] ^= (seed >> 16) & 0xffff;
    }
  }
  let ekx8a = new Uint8Array(ekx16.buffer);
  return ekx8a;
};

let verifyChk = pkx => {
  let chk = 0;
  let pkx16 = new Uint16Array(pkx.buffer, pkx.byteOffset, pkx.byteLength >> 1);
  for (let i = 8 / 2; i < 232 / 2; i++) {
    chk += pkx16[i];
  }
  let actualsum = pkx16[6 / 2];
  if (pkx16[8 / 2] > 750 || pkx16[0x90 / 2] != 0) return false;
  return (chk & 0xffff) == actualsum;
};

let fixChk = pkx => {
  let chk = 0;
  let pkx16 = new Uint16Array(pkx.buffer, pkx.byteOffset, pkx.byteLength >> 1);
  for (var i = 8 / 2; i < 232 / 2; i++) {
    chk += pkx16[i];
  }
  pkx16[6 / 2] = chk & 0xffff;
  return new Uint8Array(pkx16.buffer);
};

module.exports = {
  decrypt: decrypt,
  encrypt: encrypt,
  verifyChk: verifyChk,
  fixChk: fixChk
};
