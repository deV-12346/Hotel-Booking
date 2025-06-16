const Booking = require("../Model/Booking")
const Room = require("../Model/Room")


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
        return res.status(200).json({
            success:true,
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

            const booking = await Booking.create({
                  user,
                  room,
                  hotel:roomData.hotel.id,
                  guests: +guests,
                  checkInDate,
                  checkOutDate,
                  totalPrice
            })
            return res.status(200).json({
                  success:true,
                  message:"Booking Created Successfully",
                  booking
            })
      } catch (error) {
            console.log(error.message)
            return res.status(400).json({
                  success:false,
                  message:"Failed to create Booking"
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
module.exports = {CheckAvailablityAPI , CreateBooking  , getUserBooking}