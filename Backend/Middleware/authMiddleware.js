const User = require("../Model/User")

const authMiddleware = async (req,res,next)=>{
      const {userId} = await req.auth()
      if(!userId){
           return res.status(401).json({
            success:false,
            message:"Not authenticated Please login",
           })
      }
      else{
            const user = await User.findById(userId)
            req.user = user
            console.log(req.user)
            next()
      }
}
module.exports = authMiddleware