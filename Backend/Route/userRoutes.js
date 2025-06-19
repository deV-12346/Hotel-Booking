const express = require("express")
const userRouter = express.Router()

const {GetuserData,recentSearchCities} = require("../Controllers/UserController")
const protect = require("../Middleware/authMiddleware")

userRouter.get("/",protect,GetuserData)
userRouter.post("/store-recent-search",protect,recentSearchCities)

module.exports = userRouter