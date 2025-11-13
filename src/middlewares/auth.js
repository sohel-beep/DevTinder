/*const adminauth = (req,res,next)=>{
    
          const token = "xyz"
    const isAuth = token === "xyz"
    if(!isAuth){
        res.status(401).send("not authorised");
    } else {
      next()
    }
}*/

/*const userauth = (req,res,next)=>{
    
          const token = "xyz"
    const isAuth = token === "xyz"
    if(!isAuth){
        res.status(401).send("not authorised");
    } else {
      next()
    }
}
*/
/*
const jwt = require("jsonwebtoken")
const User = require("../middlewares/models/user.js")

const userAuth = async (req,res,next)=>{
  try{
  const {token} = req.cookies;
  if(!token){
    throw new Error("token is noty valid")
  }
  const decodedobj = await jwt.verify(token,"sohel@tinder123");
  const {_id} = decodedobj;

  const user = await User.findById(_id);
  if(!user){
    return res.status(404).send("user not found")
  }
  req.user = user
  next()

  } catch(err){
    res.status(400).send("error" + err.message)
  }

}



module.exports = {userAuth}*/


const jwt = require("jsonwebtoken");
const User = require("../middlewares/models/user.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodedobj = jwt.verify(token, "sohel@tinder123"); // removed await
    const { _id } = decodedobj;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { userAuth };
