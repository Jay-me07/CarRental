import imagekit from "../configs/imageKit.js";
import Booking from "../models/booking.js";
import Car from "../models/car.js";
import User from "../models/user.js";
import fs from "fs";

// Api to change role of user
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to list car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    
    const imageFile = req.file;
    //upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
  
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // For URL Generation, works for both images and videos
    var optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, //Width resizing
        { quality: "auto" }, // Auto Compression
        { format: "webp" }, //Convert to modern format
      ],
    });

    const image = optimizedImageURL;
    await Car.create({...car, owner:_id, image})

    res.json({success:true, message:'Car Added'})

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to list owner cars
export const getOwnerCars = async (req,res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({owner: _id})
        res.json({ success: true, cars });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//API to toggle car availability
export const toggleCarAvailability = async (req,res) => {
    try {
        const { _id } = req.user;
        const {carId} = req.body
        const car = await Car.findById(carId)
        
        // Checking if the car belongs to the user
        if (car.owner.toString() !== _id.toString()) {
            res.json({ success: false, message:"Unauthorized" })
        }

        car.isAvaliable = !car.isAvaliable;
        await car.save()

        res.json({success: true, message:"Availability Toggled"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//API to delete car
export const deleteCar = async (req,res) => {
    try {
        const { _id } = req.user;
        const {carId} = req.body
        const car = await Car.findById(carId)
        
        // Checking if the car belongs to the user
        if (car.owner.toString() !== _id.toString()) {
            res.json({ success: false, message:"Unauthorized" })
        }

        car.owner = null
        car.isAvaliable = false;
        await car.save()

        res.json({success: true, message:"Car Removed"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//API to get dashboard data
export const getDashBoardData = async (req,res) => {
    try {
        const {_id, role} = req.user;

        if (role != 'owner') {
            return res.json({success:false, message:"Unauthorized"})
        }

        const cars = await Car.find({owner: _id})
        const bookings = await Booking.find({owner: _id}).populate('car').sort({ createdAt: -1 })

        const pendingBookings = await Booking.find({owner: _id, status: 'pending'})
        const completedBookings = await Booking.find({owner: _id, status: 'confirmed'})

        //Calculate monthly revenue from Bookings where status is confirmed

        const monthlyRevenue = bookings.slice().filter(booking=> booking.status === 'confirmed').reduce((acc, booking)=> acc + booking.price, 0)

        const dashBoardData = {
          totalCars: cars.length,
          totalBookings: bookings.length,
          pendingBookings: pendingBookings.length,
          completedBookings: completedBookings.length,
          recentBookings: bookings.slice(0,3),
          monthlyRevenue
        }

        res.json({success: true, dashBoardData})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to update user image
export const updateUserImage = async (req,res) => {
  try {
     const {_id} = req.user;

     const imageFile = req.file;
     

     if (!imageFile) {
      return res.json({ success: false, message: "No image file provided." });
    }

    //upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // For URL Generation, works for both images and videos
    var optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" }, //Width resizing
        { quality: "auto" }, // Auto Compression
        { format: "webp" }, //Convert to modern format
      ],
    });

    const image = optimizedImageURL;

    await User.findByIdAndUpdate(_id, { image })

    res.json({success: true, message:"Image Updated"})

  } catch (error) {
       console.log(error.message);
        res.json({ success: false, message: error.message });
  }
}