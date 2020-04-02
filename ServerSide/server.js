const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const GetRoutes = require('./Routes/AllUserRoutes')
const path = require('path')
To add the body-parser middleware to our application and configure it, we can add the following lines directly after the line that sets our port.
var bodyParser = require('body-parser');

dotenv.config();
require('./db')
require('./passport')
const PORT=process.env.PORT || 5050

//initilization
const app = express();
aapp.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());


//get routes
app.use(GetRoutes)


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})