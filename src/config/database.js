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












/*
const mongoose = require("mongoose")


const connectt = async()=>{
   await mongoose.connect(
     "mongodb+srv://sohelahmed:OmOKqLjX9pLh98am@cluster0.om2odqc.mongodb.net/DevTinder"
     
);//this the connection string thats how we connect through db after the connction string if we write which db to connet so write after 
   //connection string we write /db name which wants to connect 
};

module.exports=connectt;
*/
const mongoose = require("mongoose");

const uri = "mongodb+srv://sohelahmed:OmOKqLjX9pLh98am@cluster0.om2odqc.mongodb.net/DevTinder";


const connectt = async () => {
  try {
    await mongoose.connect(uri, {
      tls: true // keep this if you need TLS
      // tlsAllowInvalidCertificates: true // only for testing TLS errors
    });
    console.log("✅ Connected to MongoDB Atlas successfully!");
     console.log("📦 Using DB:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB Atlas:", err);
  }
};

module.exports = connectt;


