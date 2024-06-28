const mongoose = require('mongoose')
const Bookings = require('../models/bookings')
const { eachDayOfInterval } = require('date-fns');
const createBooking = async (req, res) => {
    try {
        const booking = await Bookings.create(req.body);
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const getBookings = async (req, res) => {
    try {
        const bookings = await Bookings.find();
        res.status(200).json(bookings)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const getBookingByBookingId = async (req, res) => {
    const { id } = req.params
    try {
        const bookings = await Bookings.findById(id);
        res.status(200).json(bookings)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const getBookingsByGuestId = async (req, res) => {
    const { guest_id } = req.params;
    try {
        const bookings = await Bookings.find({ guest_id });
        if (!bookings) {
            res.status(201).json({ message: "No Bookings" })
        }
        res.status(200).json(bookings)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
const getBookedDatesByCabinId = async (req, res) => {
    const { cabins_id } = req.params;
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
 
    try {
        // Query the bookings collection
        const bookings = await Bookings.find({
            cabins_id,
            $or: [
                { startDate: { $gte: today } },
                { status: 'checked-in' }
            ]
        });

        // Convert to actual dates to be displayed in the date picker
        const bookedDates = bookings
            .map((booking) => {
                return eachDayOfInterval({
                    start: new Date(booking.startDate),
                    end: new Date(booking.endDate),
                });
            })
            .flat();

        res.status(200).json(bookedDates);
    } catch (error) {
        console.error(error);
        res.status(500).send('Bookings could not get loaded');
    }
}
const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Bookings.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const updateBooking = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {

        const updatedBooking = await Bookings.findByIdAndUpdate(id, { $set: updates }, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }


        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createBooking, getBookings, getBookedDatesByCabinId, getBookingsByGuestId, deleteBooking, getBookingByBookingId, updateBooking }