const {Schema,model} = require("mongoose")

const UserSchema = new Schema ({
      _id:{
            type:String,
            required:true
      },
      username:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true
      },
      image:{
            type:String,
            required:true
      },
      role:{
            type:String,
            enum:["user","hotelOwner"],
            default:"user"
      },
      recentSearchedCities:[{
            type:String,
            default: []
      }]

},{timestamps:true})
module.exports = model("User",UserSchema)