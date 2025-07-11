import e from "express";
import { protect } from "../middlewear/auth.js";
import { addCar, changeRoleToOwner, deleteCar, getDashBoardData, getOwnerCars, toggleCarAvailability, updateUserImage } from "../controlers/ownerController.js";
import upload from "../middlewear/multer.js";

const ownerRouter = e.Router()

ownerRouter.post("/change-role", protect, changeRoleToOwner)
ownerRouter.post("/add-car", upload.single("image"), protect, addCar)
ownerRouter.get("/cars", protect, getOwnerCars)
ownerRouter.post("/toggle-car", protect, toggleCarAvailability)
ownerRouter.post("/delete-car", protect, deleteCar)

ownerRouter.get("/dashboard", protect, getDashBoardData)
ownerRouter.post("/update-image", protect, upload.single("image"), updateUserImage)


export default ownerRouter