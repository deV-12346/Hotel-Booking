const bookingRouter = require("express").Router()
const {CheckAvailablityAPI , CreateBooking  ,
       getUserBooking, getHotelBooking } 
      = require("../Controllers/BookingController")
const Protect = require("../Middleware/authMiddleware")

bookingRouter.post("/check-availablity",CheckAvailablityAPI)
bookingRouter.post("/book",Protect,CreateBooking)
bookingRouter.get("/user",Protect,getUserBooking)
bookingRouter.get("/hotel",Protect,getHotelBooking)

module.exports = bookingRouter