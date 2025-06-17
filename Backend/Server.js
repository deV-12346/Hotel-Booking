const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDb = require("./Config/db")
const connectCloudinary = require("./Config/cloudinary");
const { clerkMiddleware } = require ('@clerk/express')
const clearkwebhooks = require("./Controllers/ClerkWebhook")
const userRouter = require("./Route/userRoutes");
const hotelRouter = require("./Route/hotelRoutes");
const roomRouter = require("./Route/roomRoutes");
const bookingRouter = require("./Route/bookingRoutes");

const app = express()

connectDb()
connectCloudinary()

app.use(cors())


//middleware
app.use(express.json())
app.use(clerkMiddleware())
app.post("/api/clerk", clearkwebhooks);


app.get("/",(req,res)=>res.send("API is working"))
app.use("/api/user",userRouter)
app.use("/api/hotels",hotelRouter)
app.use("/api/rooms",roomRouter)
app.use("/api/bookings",bookingRouter)

const Port = process.env.PORT || 3000
app.listen(Port,()=>{
      console.log(`Server started on ${Port}`)
})