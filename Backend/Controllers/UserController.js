
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
            message:err.message
      })
    }
}
// /store-recent-search
const recentSearchedCities = async(req,res)=>{
      try {
            const {recentSearchedCity} = req.body
            const user = req.user
            if(recentSearchedCity.length <3){
                  user.recentSearchedCities.push(recentSearchedCity)
            }
            else{
                  user.recentSearchedCities.shift()
                  user.recentSearchedCities.push(recentSearchedCity)
            }
            return res.json({
                  success:true,
                  message:"City added"
            })
      } catch (error) {
            return res.json({
                  success:false,
                  message:error.message
            })
      }
}
module.exports = {GetuserData,recentSearchedCities}