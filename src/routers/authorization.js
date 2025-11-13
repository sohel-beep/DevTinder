 /* const express = require("express")
  const bcrypt = require("bcrypt");
  const  validation  = require("../middlewares/auth.js"); // your validation function
const User = require("../middlewares/models/user"); // your User model
const validate = require("../utils/validate.js")
const router = express.Router(); // create a router
const jwt = require("jsonwebtoken")
router.use(express.json());
const cookieparser = require("cookie-parser")
router.use(cookieparser());

  
  
  
  router.use(express.json())
  router.post("/signup",validate,async(req,res)=>{
   try{
    
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
    res.send("user");
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

  module.exports = router;*/


  const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../middlewares/models/user"); // your User model
const validate = require("../utils/validate.js"); // validation middleware
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

router.use(express.json());
router.use(cookieparser());

// ✅ Signup route
router.post("/signup", validate, async (req, res) => {
  try {
    const { firstName, lastName, email, password ,about,skills} = req.body;

    // hash the password
    const passwordhash = await bcrypt.hash(password, 10);

    // create new user
    const user = new User({ firstName, lastName, email,about, password: passwordhash,skills });
    await user.save();

    res.send("Data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Not saved");
  }
});

// ✅ Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    // ✅ Make sure your User model has validatepassword()
    const isPassValid = await user.validatepassword(password);
    if (!isPassValid) {
      return res.status(401).send("Invalid credentials");
    }

    // ✅ Generate token (User model must have getjwt())
    const token = user.getjwt();

    // ✅ Store token in cookie
    res.cookie("token", token, { httpOnly: true });

    // ✅ Send real user data (IMPORTANT)
    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        skills: user.skills,
        about: user.about
      },
    });

  } catch (err) {
    console.error(err);
    res.status(400).send("Something went wrong");
  }
});


// ✅ Logout route
router.post("/logout", async (req, res) => {
  try {
    res.cookie("token", "null", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.send("Logged out successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Difficulty in logout");
  }
});

module.exports = router;




