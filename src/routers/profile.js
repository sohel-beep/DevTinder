/*const express = require("express")
const profilerouter =  express.Router()
const { userAuth } = require("../middlewares/auth.js");
profilerouter.get("/profile",userAuth, async (req, res) => {
  try {
    // 1️⃣ Get token from cookies
    
    // 3️⃣ Find user by ID

    // 4️⃣ Send user profile
    const user = req.user
    res.send(user);

  } catch (err) {
    console.error("Profile Error:", err.message);
    res.status(400).send("Something went wrong");
  }
});
profilerouter.patch("/profile/update",userAuth,async(req,res)=>{
  try{
    const isAllowedupdates = ["firstName","lastName","age","skills"]
    const updates = Object.keys(req.body)
    const allowed = updates.every(field =>isAllowedupdates.includes(field))
    if(!allowed){
     return res.status(500).send("sorry not allowed to update")
    }
    updates.forEach(field => {
      req.user[field]=req.body[field]
    });
   await req.user.save()
   res.send(req.user)
  }catch{
    return res.status(400).send("something went wrong")
  }
})
profilerouter.patch("/profile/forgotpass",async(req,res)=>{
  try{
    
  const {pass} = req.body;

  const passs =  bcrypt.compare(pass,passwordhash)
  }catch{

  }

})
module.exports = profilerouter;*/

const express = require("express")
const { userAuth } = require("../middlewares/auth.js");
const profilerouter = express.Router()
const bcrypt = require("bcrypt"); // added, needed for password handling
const User = require("../middlewares/models/user"); // added, needed for DB access

/*profilerouter.get("/profile", userAuth, async (req, res) => {
  try {
    // 1️⃣ Get token from cookies

    // 3️⃣ Find user by ID

    // 4️⃣ Send user profile
    const user = req.user
    res.send(user);

  } catch (err) {
    console.error("Profile Error:", err.message);
    res.status(400).send("Something went wrong");
  }
});*/


profilerouter.get("/profile", userAuth, async (req, res) => {
  try {
    // ✅ Get full user details from DB (not just token info)
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ user });
  } catch (err) {
    console.error("Profile Error:", err.message);
    res.status(400).send("Something went wrong");
  }
});


profilerouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    const isAllowedupdates = ["firstName", "lastName","about","skills",];
    const updates = Object.keys(req.body);
    const allowed = updates.every(field => isAllowedupdates.includes(field));
    if (!allowed) {
      return res.status(500).send("sorry not allowed to update");
    }
    updates.forEach(field => {
      req.user[field] = req.body[field];
    });
    await req.user.save();
    //res.send(req.user);
    res.send({ user: req.user });

    
  } catch (err) {
    return res.status(400).send("something went wrong");
  }
});

profilerouter.patch("/profile/forgotpass", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body; // corrected variable names

    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    // Compare old password
    const passMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passMatch) return res.status(400).send({ message: "Old password is incorrect" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.send({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = profilerouter;
