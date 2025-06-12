const {Schema,model} = reqiure("mongoose")

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
            enum:["user","HotelOwner"],
            default:"user"
      },
      recentSearchedCities:[{
            type:String,
            required:true
      }]

},{timestamp:true})
module.exports = model("User",UserSchema)