//external import
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookiePserser = require('cookie-parser');
const path = require('path');
const app = express();
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
dotenv.config();

//internal import
const {errorHandler,notfoundHandler} = require('./middlewares/errorHandler');

//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("connection successful"))
.catch(err=>console.log(err))

//request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//set view engine
app.set("view engine", "ejs")

//set static folder
app.use(express.static(path.join(__dirname,"public")));

//parse cookies
app.use(cookiePserser(process.env.COOKIE_SECRET));

//routing setup
app.use("/",loginRouter);
app.use("/users",usersRouter);
app.use("/inbox",inboxRouter);
//404 not found handler
app.use(notfoundHandler);

//common error handler
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`)
})
