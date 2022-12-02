const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },

    transactions: {
        type: Array,
        required: true
    }
});


const User = mongoose.model('User', UserSchema);
module.exports = User;