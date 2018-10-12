let setValueAt = (offset, buffer, bin) => {
  let address = offset.address;
  for (var b = offset.bits, i = 0; b != 0; b--, i++, address++) {
    bin[address] = buffer[i];
  }
  return true;
};

let getValueAt = (offset, bin) => {
  let address = offset.address;
  let buffer = new Uint8Array(offset.bits);
  for (var b = offset.bits, i = 0; b != 0; b--, i++, address++) {
    buffer[i] = bin[address];
  }
  return buffer;
};

module.exports = {
  RW: {
    setValueAt: setValueAt,
    getValueAt: getValueAt
  },
  PK6: require('./PK6'),
  SAV6: require('./SAV6')
};
