const { Webhook } = require("svix");
const User = require("../Model/User");

const clearkwebhooks = async (req, res) => {
  try {
    const payload = req.body.toString("utf8");
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOKSECRET);
    wh.verify(payload, headers);

    const { data, type } = JSON.parse(payload);

    const UserData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url
    };

    console.log("Webhook type:", type);
    console.log("UserData:", UserData);

    switch (type) {
      case "user.created":
        await User.create(UserData);
        console.log("✅ User created");
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, UserData);
        console.log("✏️ User updated");
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted");
        break;
      default:
        console.log("ℹ️ Unhandled webhook type:", type);
        break;
    }

    res.json({ success: true, message: "Webhook received" });
  } catch (err) {
    console.error("❌ Error in webhook:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = clearkwebhooks;