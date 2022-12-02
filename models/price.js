const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Price', priceSchema);