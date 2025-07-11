import express from 'express'
import { getCars, getUserData, loginUser, registerUser } from '../controlers/userController.js';
import { protect } from '../middlewear/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUserData)
userRouter.get('/cars', getCars)

export default userRouter