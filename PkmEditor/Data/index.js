let text = require('./text');

let items = {
  getNameById: itemID => {
    return text.items[itemID];
  },
  list: () => {
    tmpItems = [];
    Object.keys(text.items).forEach(i => {
      tmpItems.push(text.items[i]);
    });
    return tmpItems;
  }
};

module.exports = {
  text: {
    items: items
  }
};
