const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    fullName: String,
    email: String,
    nationality: { type: String, default: null },
    nationalID: { type: String, default: null },
});

const User = mongoose.model('user', userSchema);

module.exports = User;

