const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDb = require("./Config/db")
const app = express()
const { clerkMiddleware } = require ('@clerk/express')
const clearkwebhooks = require("./Controllers/ClerkWebhook")
connectDb()

app.use(cors())

//middleware
app.use(express.json())
app.use(clerkMiddleware())

app.use("/api/clerk",clearkwebhooks)

app.get("/",(req,res)=>res.send("API is working"))
const Port = process.env.PORT || 3000
app.listen(Port,()=>{
      console.log(`Server started on ${Port}`)
})