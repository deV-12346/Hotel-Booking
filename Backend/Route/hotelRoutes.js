const hotelRouter = require("express").Router()
const protect = require("../Middleware/authMiddleware")
const registerHotel = require("../Controllers/HotelController")

hotelRouter.post("/",protect,registerHotel)

module.exports = hotelRouter