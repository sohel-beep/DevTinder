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
module.exports = profilerouter;