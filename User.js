const mongoose = require('mongoose');

const user = new mongoose.Schema({
    vehicle_no : {
        type: String,
        min: 10,
        max: 10,
        required: true,
        default: null
    },

    in_time : {
        type: Number,
        default: 0
    },

    out_time : {
        type: Number,
        default: 0,
    },

    isPaid : {
        type: Boolean,
        default: false
    },

    amountToPay : {
        type: Number,
        default: 0
    },
    imageAddress: {
        type: String,
        default: null
    }
});

module.exports = User = mongoose.model('User', user);