const express = require("express");
const bodyParser = require ("body-parser");
const session = require("express-session");
const passport = require("passport");
// const cookieParser = require('cookie-parser');


const dotenv = require("dotenv");
dotenv.config();
require("./db")
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    name: "sequelizeSession",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    }
  })
);

// passport authentication
app.use(passport.initialize());



//Routes
app.use(require("./routes/userroutes"))

app.get('/',(_,res) => res.send('Hello world'));
app.get('/logout',(_, res) => res.send('you have been logged out successfully'));

module.exports = app ;