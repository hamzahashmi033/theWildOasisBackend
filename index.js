// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cabinController = require('./controllers/cabinController');
const settingController = require('./controllers/setingsController');
const bookingController = require('./controllers/bookingController');
const userController = require("./controllers/userController")
const cors = require("cors")
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect("mongodb+srv://hamzahashmi:admin@sunbed.9nqn1h7.mongodb.net/WildOasis")
    .then(() => console.log("connected to DB."))
    .catch(err => console.log(err));
// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all HTTP methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
// Cabin Routes
app.get('/cabins', cabinController.getCabins);
app.post('/cabins', cabinController.createCabin);
app.get(`/single-cabin/:id`, cabinController.getCabin);
// Setting Routes
app.post('/settings', settingController.createSettings)
app.get('/settings', settingController.getSettings)
// Booking Routes
app.post('/booking', bookingController.createBooking)
app.get('/booking', bookingController.getBookings)
app.get('/getBookedDatesByCabinId/:cabins_id', bookingController.getBookedDatesByCabinId)
app.get("/getBookingsByGuestId/:guest_id", bookingController.getBookingsByGuestId)
app.delete("/delete-booking/:id", bookingController.deleteBooking)
app.get("/booking/:id", bookingController.getBookingByBookingId)
app.put("/update-booking/:id", bookingController.updateBooking)
// User Routes
app.get("/user", userController.getUser);
app.post("/user", userController.createUser);
app.put("/user", userController.updateProfile)
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
