const mongoose = require('mongoose');

const PigmentSchema = mongoose.Schema({

    prdoudctName: {
        type: String,
        required: true,
        min: 4,
        max: 20,
    },
    color: {
        type: String,
        required: true,
        min: 2,
        max: 100,
    },
    migrationFastness: {
        type: String,
        required: true,
        max: 100,
    },
    heatFastness: {
        type: String,
        required: true,
        max: 100,
    },
    lightFastness: {
        type: String,
        required: true,
        max: 100,
    },
    date: {
        type: Date,
        default: new Date().toLocaleString()
    },

});
const Pigment = mongoose.model('Pigment', PigmentSchema);

module.exports = Pigment
