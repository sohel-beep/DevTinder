 const mongoose = require("mongoose");
const { userAuth } = require("../middlewares/auth");
 const reqrouter = express.Router()

 reqrouter.get("/user/status",userAuth,async(reqrouter,res)=>{
    try{
    const loggedin = req.user

    const loggedinuser = await Loggedinuser.find(
        {touser:loggedinuser,_id,
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

res.json({message:"co"})
    }catch(err){
        res.send(404).send("something wrong went"+err.message)
    }
 })


 reqrouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinuer = req.user;

    const requestconnect = await Requestconnect.find({
      $or: [
        { touser: loggedinuer._id, status: "accepted" },
        { fromuser: loggedinuer._id, status: "accepted" },
      ]
    })
    .populate("fromuser", "firstName lastName skills gender")
    .populate("touser", "firstName lastName skills gender");

    // Map to get the other user
    const mapped = requestconnect.map(row => 
      row.fromuser._id.equals(loggedinuer._id)
    );

    res.json({ data: mapped });
  } catch(err) {
    console.error(err);
    res.status(404).send("something went wrong!!!");
  }
});
 

 module.exports =  reqrouter;