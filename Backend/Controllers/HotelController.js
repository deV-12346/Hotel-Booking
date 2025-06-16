const User = require("../Model/User")
const Hotel = require("../Model/Hotel")

const registerHotel = async (req,res)=>{
      try {
            const {name,address,contact,city} = req.body
            const owner = req.user._id
            const hotel = await  Hotel.findOne({owner})
            if(hotel){
                  return res.status(400).json({
                        success:false,
                        message:"Hotel already registered"
                  })
            }
            await Hotel.create({name,address,contact,city})
            await User.findByIdAndUpdate(owner,{role:"hotelOwner"})
            return res.status(200).json({
                  success:true,
                  messaage:"Hotel Registered Successfully"
            })
      } catch (error) {
            return res.json({
                  success:false,
                  messaage:error.messaage
            })
      }
}
module.exports = registerHotel