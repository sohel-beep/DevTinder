const express = require("express")
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
module.exports = profilerouter;