const adminauth = (req,res,next)=>{
    
          const token = "xyz"
    const isAuth = token === "xyz"
    if(!isAuth){
        res.status(401).send("not authorised");
    } else {
      next()
    }
}

const userauth = (req,res,next)=>{
    
          const token = "xyz"
    const isAuth = token === "xyz"
    if(!isAuth){
        res.status(401).send("not authorised");
    } else {
      next()
    }
}




module.exports = {adminauth,userauth}