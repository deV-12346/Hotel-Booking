const express = require("express")
const userRouter = express.Router()

const {GetuserData,recentSearchedCities} = require("../Controllers/UserController")
const protect = require("../Middleware/authMiddleware")

userRouter.get("/",protect,GetuserData)
userRouter.post("/store-recent-search",protect,recentSearchedCities)

module.exports = userRouter