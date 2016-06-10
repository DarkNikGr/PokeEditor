let Memory = require('./memory');
let Encryption = require('./encryption');

class SAV6 {
    constructor(binary, type){
        this._bin = binary;
        this._type = type;
        if(this._type == 'XY'){
            this.offset = Memory.PK6.XY
        }
    }
}

module.exports = SAV6;