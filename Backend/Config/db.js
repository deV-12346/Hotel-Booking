const mongoose = require("mongoose")

const connectDb  = async () => {
      try {
            // mongoose.connection.on("connected",()=>(
            //       console.log("Mongo Db connected")
            // ))
            await mongoose.connect(`${process.env.MONGODB_URL}/hotel-booking`);
            console.log("Mongo Db connected")
      } catch (error) {
            console.log(error.message)
      }
}
module.exports = connectDb 