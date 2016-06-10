let Memory = require('./memory');
let Encryption = require('./encryption');

class SAV6 {
    constructor(binary, type){
        this._bin = binary;
        this._type = type;
        if(this._type == 'XY'){
            this.offset = Memory.PK6.MAP.XY
        }else if(this._type == 'ORAS'){
            this.offset = Memory.PK6.MAP.ORAS
        }
    }
    
    get gameType() {
        return this._type;
    }
}

module.exports = SAV6;