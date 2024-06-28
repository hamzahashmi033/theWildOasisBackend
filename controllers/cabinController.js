const Cabin = require('../models/cabin');
const mongoose = require('mongoose')
const getCabins = async (req, res) => {
    try {
        const cabins = await Cabin.find();
        res.json(cabins); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createCabin = async (req, res) => {
    try {
        const newCabin = await Cabin.create(req.body);

        // If the operation is successful, return the newly created cabin document
        res.status(201).json(newCabin);
    } catch (error) {
        // If there's an error during the operation, return an error response
        res.status(400).json({ message: error.message });
    }
};
const getCabin = async (req, res) => {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
        return res.status(400).json({ error: 'Cabin ID is required' });
    }

    // Validate the ID format (assuming MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Cabin ID format' });
    }

    try {
        const cabin = await Cabin.findById(id);

        // Check if cabin exists
        if (!cabin) {
            return res.status(404).json({ error: 'Cabin not found' });
        }

        // Return the found cabin
        return res.status(200).json(cabin);
    } catch (error) {
        // Handle any other errors
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the cabin' });
    }
}
module.exports = { getCabins, createCabin,getCabin };