import express from "express"
import "dotenv/config";
import cors from 'cors'
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";


//initializa express app
const app = express()

//Connect DB
await connectDB()

//middlewear
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => res.send('Server is running'))
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/booking', bookingRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`));
