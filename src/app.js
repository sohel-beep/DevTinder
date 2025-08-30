const express = require("express")
// now we call this app express its like  creating app crating server now we able to listen requests  
const app = express()
// this is how we created a server and its is ready the cursor is ready to listen our requests so the 3000 port we give we can write any port number its upn us 
// and now we created a calll back function in it now we can see it in console
//now we are just listening our requests not handelling it now we handle it 
//this function is known as a request handler

// just suppose if we want to go on /hello section or page  page like localhost:3000/hello
app.use("/hello",(req,res)=>{
    res.send("hello hello")
})



app.use("/test",(req,res)=>{
    res.send("helllo from server");
});

// just suppose if we want to go on section or page  page like localhost:3000
app.use("/",(req,res)=>{
    res.send("hello from the dashboard")
})


// this is how we created a server and its is ready the cursor is ready to listen our requests so the 3000 port we give we can write any port number its upn us 
// and now we created a calll back function in it now we can see it in console
app.listen(3000,()=>{
    console.log("server created succesully")
})
// see if we add something our code after run its annoying everytime doing it so 
//so install nodemon it helps how to insatll first npm install -g nodemon
//we have to write to run the run the nodemon src/app.js the same thing like nodejs but 
//its one time it automatically refreshes our page if writing code it will automatically update not stop server just write like frontend 



//after using gitinit it will make cahnges in our whole project like something 608 files 
//if we do create  .gitingnore than in gitignore we write node_modules which files to ignore so it will ignore our all node modules on github repository
//because we can recreate our node modules again if we recreate it again then why we need it to to push on our git repository how we install again just 
// npm install it will just intall node modules again how it created again it will use our package.json dat to create again 
 // now when we ignored node modules when we see the files to be on reository is only 4 so what to push and commit how to do it 
 //just on commit also  created a server a name jsut click on commmit button and just see we can add the changes and all and commit is like new file 
 // but you dont dont wanna go there you can just write in terminal just write like 
 // git add. 
 // this command means all the which we can see this . means it that if we want a particular file add on repository then we do 
 //git add app.js 
 //like this the file name also which file want to add
