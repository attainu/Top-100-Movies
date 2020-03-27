const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
require("./db")
const app = express();

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
module.exports = app ;