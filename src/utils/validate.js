const validator = require("validator")

const validation =(req)=>{
const {firstName,lastName,email,password}=req.body
if(!firstName || !lastName){
    throw new Error("credentials not matched")
}
else if(firstName.length<4){
    throw new Error("thye first name should be greater than four characters")
}
else if(!validator.isEmail(email)){
    throw new Error("credentials not match")
}
else if(!validator.isStrongPassword(password)){
    
    throw new Error("credentials not match")
}

}
module.exports = {validation}