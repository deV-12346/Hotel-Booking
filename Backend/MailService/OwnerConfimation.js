const nodemailer = require("nodemailer")
const config = require("../Config/Mail")
const OwnerMail = async (hotelname,email,username,id,roomType,checkInDate,checkOutDate,amount,guests,status)=>{
     const transporter = nodemailer.createTransport(config)
     let message = {
      form: `"QuickStay"<${process.env.EMAIL}>`,
      to:email,
      subject:"Room booking confirmation",
      html:`
      <h4>Dear ${hotelname}</h4>
      <p>${username} has booked your hotel</p>
      <ul>
      <li><strong>Order id :</strong>${id}</li>
      <li><strong>Room Type :</strong>${roomType}</li>
      <li><strong>CheckIN Date :</strong>${checkInDate}</li>
      <li><strong>CheckOut Date :</strong>${checkOutDate}</li>
      <li><strong>Amount :</strong>${amount}</li>
      <li><strong>Number of Guests :</strong>${guests}</li>
       <li><strong>Payment Status :</strong>${status}</li>
      </ul>
      <p>Thank you </p>
      `
}
try {
      await transporter.sendMail(message)
      console.log("anku ") 
} catch (error) {
      console.log(error)
}
}
module.exports = OwnerMail