const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
require("dotenv").config()
const connectDb = require("./Config/db")
const connectCloudinary = require("./Config/cloudinary");
const { clerkMiddleware } = require ('@clerk/express')
const clearkwebhooks = require("./Controllers/ClerkWebhook")
const userRouter = require("./Route/userRoutes");
const hotelRouter = require("./Route/hotelRoutes");
const roomRouter = require("./Route/roomRoutes");

const app = express()

connectDb()
connectCloudinary()

app.use(cors())


//middleware
app.post("/api/clerk", bodyParser.raw({ type: "application/json" }), clearkwebhooks);
app.use(express.json())
app.use(clerkMiddleware())



app.get("/",(req,res)=>res.send("API is working"))
app.use("/api/user",userRouter)
app.use("/api/hotels",hotelRouter)
app.use("/api/rooms",roomRouter)

const Port = process.env.PORT || 3000
app.listen(Port,()=>{
      console.log(`Server started on ${Port}`)
})