const User = require("../Model/User")

// Get /api/user/
const GetuserData = async (req,res)=>{
    try {
      const role = req.user.role
      const recentSearchedCities = req.user.recentSearchedCities
      return res.json({
            success:true,
            role,
            recentSearchedCities
      })
    } catch (error) {
      return res.json({
            success:false,
            message:error.message
      })
    }
}
// /store-recent-search
const recentSearchCities = async(req,res)=>{
      try {
            const {recentSearchedCity} = req.body
            const user = await User.findById(req.user.id)
            console.log(recentSearchedCity)
            if(user.recentSearchedCities.length < 3){
                  user.recentSearchedCities.push(recentSearchedCity)
            }
            else{
                  user.recentSearchedCities.shift()
                  user.recentSearchedCities.push(recentSearchedCity)
            }
            await user.save()
            return res.json({
                  success:true,
                  message:"City added",
            })
      } catch (error) {
            return res.json({
                  success:false,
                  message:error.message
            })
      }
}
module.exports = {GetuserData,recentSearchCities}