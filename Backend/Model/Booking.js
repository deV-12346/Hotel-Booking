const {model, Schema} = require("mongoose")
const BookingSchema = new Schema({
      user:{
            type:String,
            required:true,
            ref:"User"
      },
      room:{
            type:String,
            required:true,
            ref:"Room"
      },
      hotel:{
            type:String,
            required:true,
            ref:"Hotel"
      },
      user:{
            type:String,
            required:true,
            ref:"User"
      },
      checkInDate:{
            type:Date,
            required:true,
      },
      checkOutDate:{
            type:Date,
            required:true,
      },
      totalPrice:{
            type:Number,
            required:true
      },
      guests:{
            type:Number,
            required:true
      },
      status:{
           type:String,
           enum:["pending","confirmed","cancelled"],
           default:"pending"
      },
      paymentMethod:{
          type:String,
          required:true,
          default:"Pay At Hotel"
      },
      isPaid:{
          type:Boolean,
          default:false
      }

},{timestamps:true})
module.exports = model("Booking",BookingSchema)