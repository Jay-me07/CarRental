import Booking from "../models/booking.js"
import Car from "../models/car.js"


// function to get availability of car
const checkAvailability = async (car, pickUpDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickUpDate: {$lte: returnDate},
        returnDate: {$gte: returnDate},
    })

    return bookings.length === 0
}

//API to check availability for a given car and location
export const checkAvailabilityOfCar = async (req,res) => {
    try {
        const {location, pickUpDate, returnDate} = req.body

        //Fetch all available car for the given location
        const cars = await Car.find({location, isAvaliable: true})

        //Check car availabilty for the given date range using promise
        const availableCarsPromises = cars.map(async (car) => {
           const isAvailable = await checkAvailability(car._id, pickUpDate, returnDate)
           return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarsPromises)
        availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({success:true, availableCars})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

// API to craete booking
export const createBooking = async (req,res) => {
    try {
        const {_id} = req.user;
        const {car, pickUpDate, returnDate} = req.body;

        const isAvailable = await checkAvailability(car, pickUpDate, returnDate)

        if (!isAvailable) {
            return res.json({success: false, message: "Car is not available"})
        }

        const carData = await Car.findById(car)

        // Calculate price based on pickUp and return date
        const picked = new Date(pickUpDate)
        const returned = new Date(returnDate)

        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 *24))
        const price = carData.pricePerDay * noOfDays

        await Booking.create({car, owner: carData.owner, user: _id, pickUpDate, returnDate, price})

        res.json({success: true, message:"Booking Created"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

// API to list user bookings
export const getUserBooking = async (req,res) => {
    try {
        const {_id} = req.user
        const bookings = await Booking.find({user: _id}).populate("car").sort({createdAt: -1})

        res.json({success: true,bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//API to get owner bookings
export const getOwnerBooking = async (req,res) => {
    try {
        if (req.user.role !== "owner") {
            return res.json({success: false, message: "Not Authorized"})
        }

        const bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt: -1})

        res.json({success: true,bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//API to change the booking status
export const changeBookingStatus = async (req,res) => {
    try {
        const {_id} = req.user
        const {bookingId, status} = req.body
        const booking = await Booking.findById(bookingId)

        if (booking.owner.toString() !== _id.toString()) {
            return res.json({success: false, message:"Not Authorized"})
        }

        booking.status = status
        await booking.save()
        res.json({success: true, message:"Status Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}