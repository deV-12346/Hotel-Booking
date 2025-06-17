const User = require("../Model/User")

const authMiddleware = async (req,res,next)=>{
      const {userId} = req.auth
      if(!userId){
           return res.json({
            success:false,
            message:"Not authenticated",
           })
      }
      else{
            const user = await User.findById(userId)
            console.log(req.user)
            req.user = user
            next()
      }
}
module.exports = authMiddleware