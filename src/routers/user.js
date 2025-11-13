 const express = require("express")
 const User = require("../middlewares/models/user");
 const mongoose = require("mongoose");
const { userAuth } = require("../middlewares/auth");
const Requestconnect = require("../middlewares/models/requestconnect");
 const reqr = express.Router()

 reqr.get("/user/status",userAuth,async(req,res)=>{
    try{
    const loggedin = req.user

    const pendingrequests = await Requestconnect.find(
        {touser:loggedin._id,
        status:"pending",
        }).populate(["firstName","lastName","skills","gender"])
       /* What is a Relationship in MongoDB?

A relationship describes how documents (records) in one collection are connected to documents in another collection.

Unlike SQL, MongoDB is NoSQL / document-based, so relationships are not enforced strictly, but we can represent them using references or embedding.

🔹 Types of Relationships in MongoDB

Embedding (One-to-One or One-to-Many)

Store related data inside the same document.

Example: A user has multiple addresses.

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  addresses: [
    {
      street: String,
      city: String,
      zip: String
    }
  ]
});


✅ Fast for read operations (single query)

❌ Can make documents very large if embedded data grows a lot

Referencing (Normalized / Using ObjectId)

Store ObjectId of another document and fetch it when needed.

Example: A user has multiple posts.

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});


To get posts with user data:

Post.find().populate("author"); // populates user data


✅ Keeps documents smaller

✅ Better for large datasets

🔹 Slightly slower for reads because it may require join-like operation (populate)

🔹 Types of Relationships in MongoDB Terms
Relationship	MongoDB Representation	Example
One-to-One	Embed or reference	User → Profile
One-to-Many	Embed or reference	User → Posts
Many-to-Many	Reference + array	Students ↔ Courses
🔹 TL;DR

Relation = connection between documents in collections.

Two ways to represent it:

Embed (store inside document) → fast reads, larger documents.

Reference (store ObjectId) → smaller documents, needs populate to fetch related data.

MongoDB is flexible → choose based on read/write patterns and data size.*/

res.json({pendingrequests})
    }catch(err){
        res.send(404).send("something wrong went"+err.message)
    }
 })

reqr.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinuer = req.user;

    const requestconnect = await Requestconnect.find({
      $or: [
        { touser: loggedinuer._id, status: "accepted" },
        { fromuser: loggedinuer._id, status: "accepted" },
      ]
    })
    .populate("fromuser", "firstName lastName skills gender about")
    .populate("touser", "firstName lastName skills gender about");

    // Map to get the other user
    const connections = requestconnect.map(row => 
      row.fromuser._id.equals(loggedinuer._id) ? row.touser : row.fromuser
    );

    res.json({ connections });
  } catch(err) {
    console.error(err);
    res.status(404).send("something went wrong!!!");
  }
});




// now we are making feed making and its the very core thing to make the dev tinder so its best to make feed api because its crucil
//to male 
reqr.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedinuser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const requestconnect = await Requestconnect.find({
      $or: [
        { fromuser: loggedinuser._id },
        { touser: loggedinuser._id },
      ]
    }).select("fromuser touser");

    const hiddenuserafterreq = new Set();

    requestconnect.forEach((r) => {
  if (!r.fromuser.equals(loggedinuser._id)) hiddenuserafterreq.add(r.fromuser.toString());
  if (!r.touser.equals(loggedinuser._id)) hiddenuserafterreq.add(r.touser.toString());
});


    console.log("loggedinuser:", loggedinuser._id);
    console.log("hidden users:", Array.from(hiddenuserafterreq));

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenuserafterreq) } },
        { _id: { $ne: loggedinuser._id } }
      ],
    }).select("firstName lastName skills gender about").skip(skip).limit(limit);

    res.json({users});
  } catch (error) {
    console.error("Feed error:", error); // logs full error in server console
    res.status(404).json({
      message: "something went wrong!!!",
      error: error.message || error
    });
  }
});



 module.exports =  reqr;