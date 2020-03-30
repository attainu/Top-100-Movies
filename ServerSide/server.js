const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const GetRoutes = require('./Routes/AllUserRoutes')
dotenv.config();
require('./db')
require('./passport')
const PORT=process.env.PORT || 5050

//initilization
const app = express();
app.use(express.json());
app.use(passport.initialize());


//get routes
app.use(GetRoutes)


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})