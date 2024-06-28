const User = require('../models/user');
const mongoose = require('mongoose')
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.query.email });
        if (!user) {
            return res.status(200).json({ success: false, message: "User Not found" });
        } else {
            return res.status(200).json({ success: true, user });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const createdUser = await User.create(req.body);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.body.id)
        if (!user) {
            res.status(404).json({ success: false, message: "User Not found" })
        } else {
            user.nationality = req.body.updateUser.nationality
            user.nationalID = req.body.updateUser.nationalID
            await user.save();
            res.status(201).json({ success: true, message: "User has been created Successfully!" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getUser, createUser, updateProfile };