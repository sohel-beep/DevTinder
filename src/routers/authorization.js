  const express = require("express")
  const bcrypt = require("bcrypt");
  const { validation } = require("../middlewares/auth.js"); // your validation function
const User = require("../middlewares/models/user"); // your User model
const router = express.Router(); // create a router
const jwt = require("jsonwebtoken")
router.use(express.json());
const cookieparser = require("cookie-parser")
router.use(cookieparser());

  
  
  
  router.use(express.json())
  router.post("/signup",async(req,res)=>{
   try{
    validation(req)
    //decypt the password
    const {firstName,lastName,email,password} = req.body

    const passwordhash = await bcrypt.hash(password,10)
    //console.log(passwordhash)

    // ab is bjai const user = new User(req.body)
    const user = new User({firstName,lastName,email,password:passwordhash})
    await user.save()
    res.send("data saved succesfulkly")
   }catch(err){
    console.error(err)
    res.status(500).send("not saved")
   }
  })



  router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const ispassvalid = await user.validatepassword(password);
    if (!ispassvalid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = user.getjwt(); // get JWT
    res.cookie("token", token, { httpOnly: true }); // set cookie securely
    res.send("Login successful");
  } catch (err) {
    console.error(err);
    res.status(400).send("Something went wrong");
  }
});
router.post("/logout", async (req, res) => {
  try {
    res.cookie("token", "null", {  // clear the token
      httpOnly: true,
      expires: new Date(0)   // set expiration in the past
    });
    res.send("Logged out successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Difficulty in logout");
  }
});

  module.exports = router;



