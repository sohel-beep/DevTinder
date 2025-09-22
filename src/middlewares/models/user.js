/*what is schema and models
ChatGPT said:

In the context of backend development, especially with MongoDB and Mongoose (commonly used in Node.js), schemas and models are fundamental concepts for defining and working with data. Let me explain clearly:

1. Schema

A schema is like a blueprint for your data. It defines how your data should look, what fields it should have, and what type of data each field should store. It can also include rules like required fields, default values, or validation.

Think of it like a form template. For example, if you have a user registration system, a schema defines that a user should have a name, email, password, and maybe age.

Example (Mongoose Schema):

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: Number
});


✅ Here, userSchema defines the structure and rules for a user.

2. Model

A model is a compiled version of the schema. It’s what you use to interact with the database. Through a model, you can:

Create new documents (insert data)

Read documents (query data)

Update documents

Delete documents

Think of it like the real, working object that follows the blueprint.

Example (Mongoose Model):

const User = mongoose.model('User', userSchema);


Now User is the model. You can do things like:

// Create a new user
const newUser = new User({
  name: 'Sohel',
  email: 'sohel@example.com',
  password: '12345',
  age: 23
});

newUser.save() // Saves user to database
  .then(() => console.log('User saved!'))
  .catch(err => console.log(err));

✅ Key Difference
Feature	Schema	Model
Definition	Structure/blueprint of data	Interface to interact with DB
Purpose	Defines fields, types, validation	Performs CRUD operations
Example	userSchema	User*/



const mongoose = require("mongoose")

const userdata = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastname:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    password:{
        type:String
    }
})
const User = mongoose.model("user",userdata)
module.exports = User