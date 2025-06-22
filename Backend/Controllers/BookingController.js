const Booking = require("../Model/Booking.js")
const Room = require("../Model/Room.js")
const Hotel = require("../Model/Hotel.js")
const User = require("../Model/User.js")
const { ConfirmationMail } = require("../MailService/RoomComfirmation.js")
const OwnerMail = require("../MailService/OwnerConfimation.js")

// Function to check availability of room
const CheckAvailablity = async ({room,checkInDate,checkOutDate}) =>{
      try{
          const booking = await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte : checkInDate}
          })
          const isAvailable = booking.length === 0 
          return isAvailable 
      }
      catch(error){
         console.error(error.message)
      }
}

//API to check the availability of room
//post /api/bookings/check-availablity
const CheckAvailablityAPI = async(req,res)=>{
      try{
        const {room,checkInDate,checkOutDate} = req.body
        const isAvailable = await CheckAvailablity({room,checkInDate,checkOutDate})
        if(!isAvailable){
         return res.status(400).json({
            success:false,
            message:"Room is not available",
            isAvailable
        })
      }
        return res.status(200).json({
            success:true,
            message:"Room is available",
            isAvailable
      })
      }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
      }
}

// API to create new Booking
//post /api/bookings/book
const CreateBooking = async (req,res)=>{
      try {
            const {room,checkInDate,checkOutDate,guests} = req.body
            const user = req.user._id
            const userData = await User.findById(user)
             //before booking check availability
            const isAvailable = await CheckAvailablity({
                  room,
                  checkInDate,
                  checkOutDate
            })
            if(!isAvailable){
                  return res.status(400).json({
                        success:false,
                        message:"Room is not available"
                  })
            }
            const roomData = await Room.findById(room).populate("hotel")
            let totalPrice = roomData.pricePerNight
            //calculating total price
            const checkin = new Date(checkInDate)
            const checkout = new Date(checkOutDate)
            const timeDifference = checkout.getTime()-checkin.getTime()
            const nights = Math.ceil(timeDifference / (1000*3600*24))
            totalPrice *= nights

            const owner = await User.findById(roomData.hotel.owner)

            const booking = await Booking.create({
                  user,
                  room,
                  hotel:roomData.hotel.id,
                  guests: +guests,
                  checkInDate,
                  checkOutDate,
                  totalPrice
            })
            ConfirmationMail(userData.username,
                  userData.email,roomData.hotel.name,
                  roomData.hotel.address,
                  checkInDate,totalPrice,
                  booking._id)
            OwnerMail(roomData.hotel.name,
                  owner.email,
                  owner.username,
                  booking._id,
                  roomData.roomType,
                  checkInDate,checkOutDate,totalPrice,guests,
                  booking.status
            )
            return res.status(200).json({
                  success:true,
                  message:"Booking Created Successfully",
                  booking
            })
      } catch (error) {
            console.log(error.message)
            return res.status(400).json({
                  success:false,
                  message:error.message
            })
      }
}

//Api to get all booking for a user 
// /api/bookings/user
const getUserBooking = async (req,res)=>{
      try {
            const user = req.user._id
            const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt : -1})
            return res.status(200).json({
                  success:true,
                  bookings
            })
      } catch (error) {
            return res.status(400).json({
                  success:false,
                  message:"Failed to fecth bookings"
            })
      }
}

const getHotelBooking = async (req,res)=>{
      try{
      const hotel = await Hotel.findOne({owner:req.auth.userId})
      if(!hotel){
            return res.status(400).json({
                  success:false,
                  message:"Hotel not found"
            })
      }
      console.log(hotel)
      const bookings = await Booking.find({hotel:hotel._id}).populate("room hotel user")
      .sort({createdAt:-1})
      console.log(bookings)
      // total bookings
      let totalbooking = bookings.length
      let totalrevenue = bookings.reduce((acc,booking)=> acc+booking.totalPrice , 0)
      console.log(bookings,totalbooking,totalrevenue)
      return res.status(200).json({
            success:true,
            message:"bookings fetched",
            dashboardData:{
                  bookings,
                  totalbooking,
                  totalrevenue
            }
      })
      }catch(error){
       return res.status(400).json({
            success:false,
            message:error.message
       })
      }
}
module.exports = {CheckAvailablityAPI , CreateBooking  , getUserBooking, getHotelBooking }