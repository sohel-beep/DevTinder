// see why i did we have created this instaed we can use connecetion req in user also 
//see we have not created this in uer schema because the user from to user so bro connection schema is also should be diiferent 
//because schema is for user but requestconnection is for the another user which we have sent the request so thats why its best to create a new instance 
//and schema for requestconnection so this will define the connection between two users 


const mongoose = require("mongoose")

const connectionSchema = new mongoose.Schema({
    fromuser:{
        type:mongoose.Schema.Types.ObjectId,// see this is how we connect through id becsuse its not string not number so this how this type 
        ref:"User",
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
        required:true,
    },
    touser:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    statuss:{
        type:String,
        enum:{ //enum is for like this required instead this 
            values:["ignored","pending","rejected","accepted"],
            message:`{values} is not allowed fields`,// it will show this eror
        }
    }
},
{timestamps:true}
)

/*What is an Index?

An index in a database is like the index of a book:

Imagine you have a huge book and want to find all pages that mention “Node.js”.

Without an index, you’d have to read every page → very slow.

With an index, you look up “Node.js” in the index → it tells you exactly which pages to go to → much faster.

✅ In databases, an index is a special data structure that speeds up searching, sorting, and querying.

🔹 How Indexes Work in MongoDB / Mongoose

By default, MongoDB searches are collection scans → it looks at every document.

An index acts like a lookup table for a field, so queries can find documents quickly.

Example:
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // unique creates an index automatically
  age: Number
});


unique: true → MongoDB automatically creates an index on email.

Now User.findOne({ email: "test@example.com" }) is much faster.

🔹 Types of Indexes

Single-field index → index on one field.

db.users.createIndex({ age: 1 }); // ascending


Compound index → index on multiple fields.

db.users.createIndex({ firstName: 1, lastName: 1 });


Unique index → ensures no duplicate values.

db.users.createIndex({ email: 1 }, { unique: true });


Text index → for searching text fields efficiently.

db.posts.createIndex({ content: "text" });

🔹 Advantages of Indexes

✅ Speeds up queries (find, findOne, aggregate).

✅ Speeds up sorting on indexed fields.

✅ Can enforce uniqueness (unique: true).

🔹 Disadvantages of Indexes

❌ Use extra storage → indexes take space.

❌ Slows down writes (insert, update, delete) slightly, because the index needs updating.

❌ If you create indexes on all fields, MongoDB will spend more time updating them → not efficient.

🔹 TL;DR

Indexes = a lookup table in your database that makes searching faster.
They are essential for performance but should be used wisely, not on every field. */
// seee bro this is handled by monoose itself because we have created this its easy for mongodb to find these 
//it has ascending desending see more in mongoose website for index and we cant do for all index give index to all thimng its bad practise 
//this is compound index
connectionSchema.index({firstName:1,lastNmae:1})







/*Ah, now you’re asking about Mongoose “pre” middleware on schemas — this is an important feature for running code before or after certain operations on a document. Let me explain clearly.

🔹 What is pre in Mongoose Schema?

pre is a middleware hook in Mongoose.

It allows you to run a function before a certain event happens on a document or query.

Common events: save, updateOne, deleteOne, find, etc.

🔹 Syntax
userSchema.pre("save", function(next) {
  // 'this' refers to the document being saved
  console.log("Before saving:", this);

  // You can modify fields, hash password, etc.
  next(); // call next() to continue saving
});

🔹 Common Use Cases

Hashing passwords before saving

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


Updating timestamps

userSchema.pre("updateOne", function(next) {
  this.set({ updatedAt: new Date() });
  next();
});


Validation or logging

userSchema.pre("save", function(next) {
  console.log("User is about to be saved:", this.name);
  next();
});

🔹 Notes

pre middleware runs before the action.

There is also post middleware that runs after the action:

userSchema.post("save", function(doc) {
  console.log("User saved:", doc);
});


Always call next() in pre middleware; otherwise, the operation will hang.

🔹 TL;DR

Pre schema middleware is a function in Mongoose that runs before a specific operation (like save, update, or delete) on a document.
It’s commonly used for hashing passwords, modifying fields, logging, or validation. */

connectionSchema.pre("save",function(next){
    const connectionSchema=this
    if(connectionSchema.fromuser.equals(connectionSchema.touser)){
        throw new Error("you cant send request to ur self")
    }
    next()
})



// model should be created in capital lettre
const Connectionn = new mongoose.model("Connectionn",connectionSchema)
module.exports = Connectionn


