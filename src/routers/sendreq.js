/*const express = require("express")
const sendreqrouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { connection, connection } = require("mongoose");*/

/*
sendreqrouter.post("/sendreq", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // you can use user data here, e.g., user.firstName
    res.send(user.firstName + " request is sent");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});*/


const express = require("express");
const sendReqRouter = express.Router();
const Request = require("../middlewares/models/requestconnect.js");
const Connection = require("../middlewares/models/requestconnect.js"); // make sure path is correct
const { userAuth } = require("../middlewares/auth"); // if you want to get req.user
const User = require("../middlewares/models/user.js");
//const { connection, connection } = require("mongoose");


/*
sendReqRouter.post("/req/send/:status/:touser", userAuth, async (req, res) => {
  try {
    const fromUser = req.user._id;
    const toUser = req.params.touser;
    const status = req.params.status;

    //this is for ststuts which we allowed instead of this status it will not work
    const allowedStatus = ["accepted", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Wrong status code" });
      
    }
    if (fromUser.equals(toUser)) {
      return res.status(400).json({ message: "You cannot send a request to yourself" });
    }
//this logic is for to find if user is here in our db or not 
    const touserid = await User.findById(touser);
    if(!touserid){
      return res.status(404).send("not found")
    }
//this logic is for to existing connection is there or not 
    const existingRequest = await Connection.findOne({
      $or: [
        { fromuser: fromUser, touser: toUser },
        { fromuser: toUser, touser: fromUser },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }
//this is to create new model
    const request = new Connection({
      fromuser: fromUser,
      touser: toUser,
      statuss: status,
    });
// to save 
    const data = await request.save();
    res.json({ message: "Connection request sent successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});*/
sendReqRouter.post("/req/send/:status/:touser", userAuth, async (req, res) => {
  try {
    const fromUser = req.user._id;
    const toUser = req.params.touser;
    const status = req.params.status; // fixed typo, was req.params.statuss

    // this is for status which we allowed, otherwise it will not work
    const allowedStatus = ["accepted", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Wrong status code" });
    }

    if (fromUser.equals(toUser)) {
      return res.status(400).json({ message: "You cannot send a request to yourself" });
    }

    // this logic is to check if user exists in DB
    const toUserExists = await User.findById(toUser); // fixed variable name
    if (!toUserExists) {
      return res.status(404).send("User not found");
    }

    // this logic is to check if an existing connection is there or not
    const existingRequest = await Connection.findOne({
      $or: [
        { fromuser: fromUser, touser: toUser },
        { fromuser: toUser, touser: fromUser },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    // this is to create new model
    const request = new Connection({
      fromuser: fromUser,
      touser: toUser,
      status: status, // fixed schema field name, was statuss
    });

    // to save
    const data = await request.save();
    res.json({ message: "Connection request sent successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// now the last thing bug is which we think as of now that our user id can connect withe their own user id so we cant do tha 
//its bad experience we can do pseudocode id===id false this is but instaed of this we use pre method mongoose in requestconnect model





// now we are making api for to user which will reject or accept the user ifd should be rwjected or accepted 
// firts we create a user id is and make our routes dynamic so that we dont create a 
//a accepted or rjejected differnet api for both spo we craete a status route dynamic
/*
sendReqRouter.post("/send/req/:status/:reqid",userAuth,async(req,res)=>{
  try{
    const loggedinuser = req.user;
  const {status,reqid}= req.params;
  

  const isallowedd = ["accepted","rejected"]
  if(!isallowedd.includes(status)){
    return res.status(400).json({message:"you rae not allowed"})
  }
   const requestt = await Request.findOne({_id:reqid,status:"interested"})
   if(!requestt){
   return res.status(404).send({message:"the user not found"})
   }
    requestt.statuss = status;
  const data =  await requestt.save()
  res.status(200).json({message:"request is sent succesfully"+data+status})
  }catch(err){
    res.send(500).json({message:"the server is busy"})
  }
})



module.exports = sendReqRouter;*/
sendReqRouter.post("/send/req/:status/:reqid", userAuth, async (req, res) => {
  try {
    const loggedinuser = req.user;
    const { status, reqid } = req.params;

    const isallowedd = ["accepted", "rejected"];
    if (!isallowedd.includes(status)) {
      return res.status(400).json({ message: "You are not allowed" });
    }

    // fixed model name: Request → Connection
    const requestt = await Connection.findOne({ _id: reqid, status: "interested" });
    if (!requestt) {
      return res.status(404).send({ message: "The request not found" });
    }

    // ensure only the receiver can update
    if (!requestt.touser.equals(loggedinuser._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    requestt.status = status; // fixed schema field, was statuss
    const data = await requestt.save();

    res.status(200).json({ message: "Request is sent successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "The server is busy", error: err.message });
  }
});

module.exports = sendReqRouter;




