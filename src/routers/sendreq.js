const express = require("express")
const sendreqrouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");


sendreqrouter.post("/sendreq", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // you can use user data here, e.g., user.firstName
    res.send(user.firstName + " request is sent");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});
module.exports = sendreqrouter
