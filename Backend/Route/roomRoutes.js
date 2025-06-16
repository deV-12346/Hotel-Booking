const roomRouter = require("express").Router()

const {createRoom, getRooms, getOwnerRooms, toggleRoomAvailability} = require("../Controllers/RoomController")
const protect = require("../Middleware/authMiddleware")
const upload = require("../Middleware/Multer")

roomRouter.post("/",upload.array("images",4),protect,createRoom)
roomRouter.get("/",getRooms)
roomRouter.get("/owner",protect,getOwnerRooms)
roomRouter.post("/toogle-availability",protect,toggleRoomAvailability)

module.exports = roomRouter