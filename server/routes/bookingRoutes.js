import e from "express";
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBooking, getUserBooking } from "../controlers/bookingController.js";
import { protect } from "../middlewear/auth.js";

const bookingRouter = e.Router()

bookingRouter.post('/check-availability', checkAvailabilityOfCar)
bookingRouter.post('/create', protect, createBooking)
bookingRouter.get('/user', protect, getUserBooking)
bookingRouter.get('/owner', protect, getOwnerBooking)
bookingRouter.post('/change-status', protect, changeBookingStatus)

export default bookingRouter