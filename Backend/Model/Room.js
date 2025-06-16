const {model,Schema}= require("mongoose")
const RoomSchema = new Schema ({
      hotel:{
            type:String,
            required:true,
            ref:"Hotel"
      },
      roomType:{
            type:String,
            require:true
      },
      pricePerNight:{
            type:Number,
            require:true
      },
      amenities:{
            type:Array,
            require:true
      },
      images:[{
            type:String
      }],
       isAvailable:{
            type:Boolean,
            default:true
      },
},{timestamps:true})

module.exports = model("Room",RoomSchema)