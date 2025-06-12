const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDb = require("./Config/db")
const app = express()

connectDb()

app.use(cors())

app.get("/",(req,res)=>res.send("API is working"))
const Port = process.env.PORT || 3000
app.listen(Port,()=>{
      console.log(`Server started on ${Port}`)
})