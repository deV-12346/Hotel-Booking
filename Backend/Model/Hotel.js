const {model , Schema} = require("mongoose")
const HotelSchema = new Schema({
      name:{
            type:String,
            required:true
      },
      address:{
            type:String,
            required:true
      },
      contact:{
            type:String,
            required:true
      },
      owner:{
            type:String,
            required:true,
            ref:"User"
      },
      city:{
            type:String,
            required:true
      }
},{timestamps:true})
module.exports = model("Hotel",HotelSchema)