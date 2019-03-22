const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objectSchema = new Schema({
    Exchange: {
      type: String
    },
    Base:String,
    Quote:String,
    TimeStart:Date, 
    PriceOpen:Number,
    PriceHigh:    Number,
    PriceLow:     Number,
    PriceClose:   Number,
    source: String

});


module.exports = mongoose.model('Obj', objectSchema);
