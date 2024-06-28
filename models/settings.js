
const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    minBookingLength: {
        type: Number,
        required: true,
    },
    maxBookingLength: {
        type: Number,
        required: true,
    },
    maxGuestPerBooking: {
        type: Number,
        required: true,
    },
    breakfastPrice: {
        type: Number,
        required: true,
    },
});

const Settings = mongoose.model('settings', settingSchema);

module.exports = Settings;
