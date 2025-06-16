const Hotel = require("../Model/Hotel.js");
const Room = require("../Model/Room.js");
const cloudinary = require("cloudinary").v2;

//api to create a new room for a hotel
const createRoom = async(req,res)=>{
     try {
      const {roomType,amenities,pricePerNight} = req.body
      const hotel = await Hotel.findOne({owner:req.auth.userId})
      
      if(!hotel){
            return res.status(400).json({
                  success:false,
                  message:"Hotel not found"
            })
      }
     //upload images to cloudinary
     const uploadimage = req.files.map(async(file)=>{
         const response = await cloudinary.uploader.upload(file.path)
         return response
     })

     //wait for all uploads to complete
     const images = await Promise.all(uploadimage)

     //save the data in DB
     await Room.create({
       hotel: hotel._id,
       roomType,
       pricePerNight: +pricePerNight,
       amenities: JSON.parse(amenities),
       images
     })
     
     return res.status(200).json({
      success:true,
      message:"Room Created Succesfully"
     })

     } catch (error) {
      return res.status(400).json({
      success:false,
      message:error.message
     })
     }
}

//API to get aLl rooms
const getRooms = async(req,res)=>{
     try {
      const rooms = await Room.find({isAvailable:true}).populate({
            path:"hotel",
            populate:{
                  path:"owner",
                  select:"image"
            }
      }).sort({createdAt:-1})
      return res.status(200).json({
            success:true,
            message:"Rooms fecthed",
            rooms
      })

     } catch (error) {
      return res.status(400).json({
            success:false,
            message:error.message
      })
     }
}

//API to get all room from specific hotel 
const getOwnerRooms = async(req,res)=>{
      try {
           const hotelData = await Hotel.find({owner:req.auth.userId}) 
           const rooms = await rooms.find({hotel:hotelData._id.toString()}).populate("hotel")
           return res.status(200).json({
            success:true,
            message:"Rooms fetched",
            rooms
           })
      } catch (error) {
         return res.status(400).json({
            success:false,
            message:error.message
      })   
      }
}

//API to toggle the room availability
const toggleRoomAvailability = async(req,res)=>{
      try{
        const {roomId} = req.body
        const roomData = await Room.findById(roomId)
        roomData.roomAvailable = !roomData.roomAvailable 
        return res.status(200).json({
            success:true,
            message:"Room Availability Updated"
        })
      }catch(error){
       return res.status(400).json({
            success:false,
            message:error.message
       })
      }
}
module.exports = {createRoom,getRooms,getOwnerRooms,toggleRoomAvailability}
