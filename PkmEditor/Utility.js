let hexChar = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F'
];
let ByteToHex = b => {
  return hexChar[(b >> 4) & 0x0f] + hexChar[b & 0x0f];
};

let ByteArrayToHex = uint8a => {
  let hex = '';
  uint8a.forEach(b => {
    hex = ByteToHex(b) + hex;
  });
  return hex;
};

let HexToUint8Array = hex => {
  let har = [];
  for (let i = 0; i < hex.length; i = i + 2) {
    har.unshift(parseInt(hex[i] + hex[i + 1], 16));
  }
  return new Uint8Array(har);
};

module.exports = {
  ByteToHex: ByteToHex,
  ByteArrayToHex: ByteArrayToHex,
  HexToUint8Array: HexToUint8Array
};
