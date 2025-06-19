const nodemailer = require("nodemailer")
const config = require("../Config/Mail")
const ConfirmationMail = async(username,email,hotelname,address,
                  date,amount,id)=>{
const transporter = nodemailer.createTransport(config)
let message = {
      from: `"QuickStay"<${process.env.EMAIL}>`,
      to:email,
      subject:"Room Details",
      html:`
      <h4>Dear ${username} ,</h4>
      <p>Thank you for your booking!</p>
      <ul>
      <li><strong>Booking ID:</strong>${id}</li>
      <li><strong>Hotel Name:</strong>${hotelname}</li>
      <li><strong>Location :</strong>${address}</li>
      <li><strong>Date :</strong>${date}</li>
      <li><strong>Total Amount :</strong>${amount}</li>
      </ul>
      <p>We are looking forward to welcoming you!</p>
      `
}
try {
      await transporter.sendMail(message)
      console.log("email sent")
} catch (error) {
      console.log(error)
}
}
module.exports = {ConfirmationMail}