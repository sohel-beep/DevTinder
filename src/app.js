//const express = require("express")
// now we call this app express its like  creating app crating server now we able to listen requests  
//const app = express()
// this is how we created a server and its is ready the cursor is ready to listen our requests so the 3000 port we give we can write any port number its upn us 
// and now we created a calll back function in it now we can see it in console
//now we are just listening our requests not handelling it now we handle it 
//this function is known as a request handler

//const { default: mongoose } = require("mongoose");




//if we do .use it will do any type of requests not particular like if we do .get it will only do .get
//if suppose we dont use res so our request listen willnot complete it just hanging around 
//it goes to infinite loop it will not give res 
/*app.use("/hello/2",(req,res)=>{
    res.send("aailuicughdiuvgwvduygvvug");
})*/


// just suppose if we want to go on /hello section or page  page like localhost:3000/hello
/*app.use("/hello",(req,res)=>{
    res.send("hello hello")
})*/



/*app.use("/test",(req,res)=>{
    res.send("helllo from server");
});*/

// just suppose if we want to go on section or page  page like localhost:3000
//the dashboard should be in last otherwise it will shows this if we go on any route thts why get it in last otherwise it will overwrite all
//the order of writing a code maters alot if we put in 1 it will always print this 
/*app.use("/",(req,res)=>{
    res.send("hello from the dashboard")
})*/



//now bro this use api call call only now we are just doing api call using get post delete lets see how it works
//first the get api 
/*app.get("/user",(req,res)=>{
    res.send({firstname:"sohel",lastname:"khan"})
})
//this is the post api
app.post("/title",(req,res)=>{
    res.send("dta successfully save to database")
})
app.delete("/user",(req,res)=>{
    res.send("this is deleted")
})*/













/*Got it! Let’s make this super simple and break it step by step with clear explanations and examples.

We are talking about Express route patterns: ?, *, and +. Think of them like rules for matching URLs.

1️⃣ /ab+c → “one or more bs”

+ means at least one of the previous character (here: b).

You must have at least one b, but can have more.

Example:
app.get("/ab+c", (req, res) => {
    res.send("Matched ab+c");
});


/abc ✅ (1 b)

/abbc ✅ (2 bs)

/abbbc ✅ (3 bs)

/ac ❌ (0 bs → doesn’t match)

💡 Rule: One or more bs.

2️⃣ /ab?c → “0 or 1 b”

? means optional — either 0 or 1 occurrence of the previous character.

Example:
app.get("/ab?c", (req, res) => {
    res.send("Matched ab?c");
});


/abc ✅ (1 b)

/ac ✅ (0 b)

/abbc ❌ (2 bs → doesn’t match)

💡 Rule: b is optional, but cannot repeat.

3️⃣ /ab*c → “0 or more bs”

* means any number (0, 1, 2, …) of the previous character.

Example:
app.get("/ab*c", (req, res) => {
    res.send("Matched ab*c");
});


/ac ✅ (0 b)

/abc ✅ (1 b)

/abbc ✅ (2 bs)

/abbbbbc ✅ (5 bs)

💡 Rule: b can repeat any number of times (including 0).

🔹 Simple analogy (think of letters as LEGO blocks)

ab+c → must have at least one b LEGO

ab?c → can have no b LEGO or one

ab*c → can have any number of b LEGOs, even none

✅ Summary Table
Pattern	Meaning	Examples that match	Examples that don’t match
ab+c	1 or more bs	/abc, /abbc	/ac
ab?c	0 or 1 b	/abc, /ac	/abbc
ab*c	0 or more bs	/ac, /abc, /abbc	— */









//now suppose if we sometimes we do like supose we want to give dynamic id like 
// this is dynamic id userid=101 localhost:3000/user?userid=101;and wwe want to see the userid how we will see now 
/*app.get("/user",(req,res)=>{
    //so now if do req.query  so then now this req.query will give the information of this  userid=101 of this parameter 
    console.log(req.query)
    res.send({firstname:"sohel",lastname:"khan"})
})*/
//so now if we run in postman http://localhost:3000/user?userid=101
//then [Object: null prototype] { userid: '101' } this will print we now we can see the user id this will give us the information of query parameters 
//and we can add more like this  http://localhost:3000/user?userid=101&age=23
//so otp is [Object: null prototype] { userid: '101', age: '23' }
//we can do it like this basically this is how you read the query parametrs 
// but now we want like localhost:3000/user/707 now how do you handle this 
// now we can use req.params so now it will work for all localhost:3000/user/707,851,etc
/*app.get("/user/:userId",(req,res)=>{
    console.log(req.params)
    res.send({firstname:"sohel",lastname:"khan"})
})*///:this in the is for the code we can use it like also 

/*app.get("/user/:userId/:name/:password", (req, res) => {
    console.log("Route params:", req.params); // { userId: '857', name: 'sohel', password: 'testing' }
    console.log("Query params:", req.query);  // { status: 'success' }

    res.send({
        userId: req.params.userId,
        name: req.params.name,
        password: req.params.password,
        status: req.query.status
    });
});*/


//otp[Object: null prototype] { userId: '707' }






// this is how we created a server and its is ready the cursor is ready to listen our requests so the 3000 port we give we can write any port number its upn us 
// and now we created a calll back function in it now we can see it in console
/*app.listen(3000,()=>{
    console.log("server created succesully")
})*/
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
 // now we will do for all git add . and next commit git commmit -m "create the express server" this is the name of commit see 






 //now for api call download the postman app and use to make api  call its a good way because in browser also we do it 
 //but postman makes a life easier of our it gives all api calls like get post delete patch etc so thats why we oare usin git 
 //first installit then login then make a new workspace > name it  > then click on new to create new api >then select the method which api to callget post etc > then call it to get and now we will how to post 
 
 



 //const express = require("express")
// now we call this app express its like  creating app crating server now we able to listen requests  
//const app = express()

//this is how we export module
//const {adminauth,userauth} = require("./middlewares/auth")

//if we do .use it will do any type of requests not particular like if we do .get it will only do .get
/*app.use("/user",(req,res)=>{
    //first router handler
    res.send("route hander1");
},*/
//there can be multiple route handler in one also 
//see now we havwe 5 multiple route handlers in one route handler 
//now what next is just suppose if our 1 route handler will not work can you think is it possible can it goes to the 2nd route handler and get the connection and make server 
//do you think it works like that way but no it will not work the way like that for that way if our first route handler didnt work so for doing work on 2nd route handler we have 
// to have to use next  
 /*(req,res)=>{
    // route handler 2
    console.log("handling the rouet user 2");
    res.send("route handler 2")
 },
 (req,res)=>{
    // route handler 3
    console.log("handling the rouet user 2");
    res.send("route handler 3")
 },
 (req,res)=>{
    // route handler 4
    console.log("handling the rouet user 2");
    res.send("route handler 4")
 },
 (req,res)=>{
    // route handler 5
    console.log("handling the rouet user 2");
    res.send("route handler 5")
 }
)*/

// seee now we have to use next here to runn next roujte handler there is no way if you have 1000 route handlers there but if you dont use next it will run next 
//if anything breaks if first didnt run properly if you dont use res.send or etc
//if you just use route handler next in just one route handler it will ignore all others because the route handler already gave the response to the clienbt 
//but in first route handler you used next and also used res.send then also it will give an error because the 2nd route handler already showed the data to the client 
// Cannot set headers after they are sent to the client it will give this error because it already sent data to the client and you already know why 
// see thats how it works you can also play with code to see more 
// and we have not used route in others also so it will not throw an error
/*app.use("/user",(req,res,next)=>{
    //first router handler
    next()
    res.send("route hander1");
},
(req,res,next)=>{
    // route handler 2
    console.log("handling the rouet user 2");
    res.send("route handler 2")
    next()
 },
 (req,res,next)=>{
    // route handler 3
    console.log("handling the rouet user 2");
    res.send("route handler 3")
    next()
 },
 (req,res,next)=>{
    // route handler 4
    console.log("handling the rouet user 2");
    res.send("route handler 4")
    next()
 },
 (req,res,next)=>{
    // route handler 5
    console.log("handling the rouet user 2");
    res.send("route handler 5")
    next();
 }
)*/























// so there is lingo of middleware what is middleware
/*what is middleware in express
ChatGPT said:

Great question 👍

In Express.js, a middleware is simply a function that sits in the middle of the request → response cycle.
When a client makes a request to your server, Express will pass that request through any middleware functions before sending the response back.

📌 Middleware in Express:

A middleware function is just a function that has access to:

req (the request object)

res (the response object)

next (a function to move to the next middleware in the chain)

function middlewareExample(req, res, next) {
    console.log("Middleware executed!");
    next(); // Pass control to the next middleware/route handler
}

📌 Types of Middleware:

Application-level middleware
Applied to the entire app:

app.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
});


Router-level middleware
Used for specific routes:

app.use("/user", (req, res, next) => {
    console.log("User middleware");
    next();
});


Built-in middleware

express.json() → parses JSON body

express.urlencoded() → parses form data

app.use(express.json());


Error-handling middleware
Has 4 parameters: (err, req, res, next)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

📌 Example in action
const express = require("express");
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log("Request URL:", req.url);
    next();
});

// Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => console.log("Server running on port 3000"));


👉 In short:
Middleware = Functions that can modify req/res, log requests, authenticate users, handle errors, or stop/continue the request flow. */
/*app.use("/user",(req,res)=>{
    //first router handler
  
    res.send("route hander1");
},

}*/











/*why do we need middleware 
ChatGPT said:

Good question 👍

Middleware is one of the core concepts of Express.js. Without it, Express would be very limited. Let me explain simply and deeply:

🔹 What is Middleware?

In Express.js, middleware is a function that sits between the request and the response.
When a request comes in, Express passes it through a chain of middleware functions, and finally to the route handler.

🔹 Why Do We Need Middleware?

We need middleware because in almost every app, you’ll have common tasks that must happen before or after handling a request.
Instead of writing the same code in every route, middleware makes it reusable and organized.

✅ Uses of Middleware:

Logging – Keep track of which requests are coming in.

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // pass to next middleware/route
});


Body Parsing – Convert incoming JSON/form data so you can use it in req.body.

app.use(express.json()); // parses JSON


Authentication & Authorization – Check if a user is logged in before allowing access.

function isAuth(req, res, next) {
  if (req.query.token === "123") {
    next(); // user allowed
  } else {
    res.status(403).send("Forbidden");
  }
}

app.get("/dashboard", isAuth, (req, res) => {
  res.send("Welcome to dashboard!");
});


Error Handling – Catch errors in one place instead of everywhere.

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


Static Files – Serve images, CSS, JS files without writing routes for each.

app.use(express.static("public"));

🔹 Without Middleware:

Every route would need duplicate code for logging, authentication, parsing, etc.

App would become messy and hard to maintain.

🔹 With Middleware:

Clean, reusable, modular.

Express can process requests step by step before hitting the final route.

⚡ So, middleware is needed to make Express apps scalable, clean, and powerful.
It’s like security checks, helpers, and preprocessors that run before the final request handler. */



//now we are using authorization init using middleware 

// Middleware for /admin
/*app.use("/admin")
app.use("/admin/getalldata",(req,res)=>{
    console.log("everything works fine")
    const token = "xyz"
    const isAuth = token === "xyz"
    if(isAuth){
        res.send("all data sent")
    } else {
        res.status(401).send("not authorised");
    }

})
//so we have do it for all apis like its very bad is it a good i am keep writing this logic to check is but its not good
app.get("/admin/deleteuser",(req,res)=>{
    res.send("auth is good ")
    const token = "wdwkcvbefvb";
    const isAuth = token === "xyz"
    if(isAuth){
        res.send("all clear")
    }else{
        res.send("not clear")
    }
})*/














// so thats why we usemiddleware 
//so this the simple way to handle all routes 
// so this line helps to request for alll route handler 
/*app.use("/admin",adminauth);
//now we pushed our all code to auth file  from here to there for easy clean look 
app.use("/user",userauth);


app.get("/user",(req,res)=>{
        res.send("all data sent")
})

app.get("/admin/getalldata",(req,res)=>{
        res.send("all data sent")
})


app.get("/admin/deleteuser",(req,res)=>{
        res.send("deleted the user ")
})

// Start server
app.listen(7777, () => {
    console.log("Server is running on port 7777");
});*/ 










/*const express = require("express")
// now we call this app express its like  creating app crating server now we able to listen requests  
const app = express()

// now we will see the error handling part 
app.use("/",(err,req,res,next)=>{
          res.send("all data sent")
    // we should always use try catch in error catching hoow we do it 
    if(err){
        res.status(500).send("something went wrong")
    }
    // logic of db  call and get user data 
})
app.get("/getuserdata",(req,res)=>{
    throw new error("dkjycgvduvdg")
})

// Start server
app.listen(7777, () => {
    console.log("Server is running on port 7777");
});*/

/*const express = require("express");
const app = express();

// Route that throws an error
app.get("/getuserdata", (req, res, next) => {
    throw new Error("Something went wrong!");
    next()
    // or next(new Error("Something went wrong!"))  — both work
});

// Error-handling middleware (must be **after all routes**)
app.use((err, req, res, next) => {
    console.error(err.stack); // log error to console
    res.status(500).send("Internal Server Error ❌");
});

// Start server
app.listen(7777, () => {
    console.log("Server is running on port 7777");
});*/































/*
const express = require("express");
require("./config/database")
const app = express();



 //Start server
app.listen(7777, () => {
    console.log("Server is running on port 7777");
})*/



const express = require("express");

const connectt = require("./config/database")
const User = require("./middlewares/models/user")
const app = express();

app.post("/singup", async(req,res)=>{
    const user = new User({
    firstName:"sohel",
    lastName:"khan",
    age:23,
    password:"soheluvb"
})

await user.save()
res.send("data saved succesfully")
})





connectt()
.then(()=>{
    console.log("db connected")
    app.listen(7777,()=>{
    console.log("server is running")
})
}).catch((err)=>{
    console.error("not connected")
})







 




