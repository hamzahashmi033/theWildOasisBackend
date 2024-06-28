const Cabin = require('../models/cabin');
const mongoose = require('mongoose');
const Settings = require('../models/settings');

const createSettings = async (req, res) => {
    try {
        const setting = await Settings.create(req.body)
        res.status(201).json(setting)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const getSettings = async (req, res) => {
    try {
        const settings = await Settings.find()
        res.status(201).json(settings)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports = { createSettings, getSettings }