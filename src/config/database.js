const mongoose = require("mongoose")


const connectdb = async () =>{
    await mongoose.connect(
        "mongodb+srv://sohelahmed:OmOKqLjX9pLh98am@cluster0.om2odqc.mongodb.net/"
    )
}
connectdb().then(()=>{
    console.log("db connectded")
}).catch(err=>{
    console.log("not connected")

})