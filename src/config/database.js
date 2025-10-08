/*const mongoose = require("mongoose")


const connectdb = async () =>{
    await mongoose.connect(
        "mongodb+srv://sohelahmed:OmOKqLjX9pLh98am@cluster0.om2odqc.mongodb.net/"
    )
}
connectdb().then(()=>{
    console.log("db connectded")
}).catch(err=>{
    console.log("not connected")

})*/













const mongoose = require("mongoose")


const connectt = async()=>{
   await mongoose.connect(
     "mongodb+srv://sohelahmed:OmOKqLjX9pLh98am@cluster0.om2odqc.mongodb.net/DevTinder"
);//this the connection string thats how we connect through db after the connction string if we write which db to connet so write after 
   //connection string we write /db name which wants to connect 
};

module.exports=connectt;
