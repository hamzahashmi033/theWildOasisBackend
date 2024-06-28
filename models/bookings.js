const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    numNights: {
        type: Number,
        required: true,
    },
    numGuests: {
        type: Number,
        required: true,
    },
    cabinPrice: {
        type: Number,  // Changed from Float to Number
        required: true,
    },
    extraPrice: {
        type: Number,  // Changed from Float to Number
        required: true,
    },
    totalPrice: {
        type: Number,  // Changed from Float to Number
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    observations :{
        type:String,
        default: ""
    },
    cabins_id: {
        type: Schema.Types.ObjectId,
        ref: 'Cabin',
        required: true,
    },
    guest_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings;
