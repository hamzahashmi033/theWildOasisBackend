

const mongoose = require('mongoose');

const cabinSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    name: String,
    maxCapacity: Number,
    regularPrice: Number,
    discount: Number,
    description: String,
    image: String
});

const Cabin = mongoose.model('cabin', cabinSchema);

module.exports = Cabin;

