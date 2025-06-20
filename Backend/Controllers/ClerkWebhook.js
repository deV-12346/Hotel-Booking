const User = require("../Model/User")
const { Webhook } = require("svix")

const clearkwebhooks = async (req, res) => {
      try {
            const whook = new Webhook(process.env.CLERK_WEBHOOKSECRET)
            const headers = {
                  "svix-id": req.headers["svix-id"],
                  "svix-timestamp": req.headers["svix-timestamp"],
                  "svix-signature": req.headers["svix-signature"]
            }
            await whook.verify(JSON.stringify(req.body), headers)

            const { data, type } = req.body
            switch (type) {
                  case "user.created": {
                        const UserData = {
                              _id: data.id,
                              email: data.email_addresses[0].email_address,
                              username: data.first_name + " " + data.last_name,
                              image: data.image_url,
                        }
                        const newUser = await User.create(UserData);
                        console.log("User saved:", newUser);
                        break;
                  }
                  case "user.updated": {
                        const UserData = {
                              _id: data.id,
                              email: data.email_addresses[0].email_address,
                              username: data.first_name + " " + data.last_name,
                              image: data.image_url,
                        }
                        await User.findByIdAndUpdate(data.id, UserData)
                        break;
                  }
                  case "user.deleted": {
                        await User.findByIdAndDelete(data.id)
                        break
                  }
                  default:
                        break;
            }
            res.json({
                  success: true,
                  message: "Webhook received"
            })
      } catch (error) {
            console.log(error.message)
            res.json({
                  success: false,
                  message: error.message
            })
      }
}
module.exports = clearkwebhooks