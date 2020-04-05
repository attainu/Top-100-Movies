const User = require("../models/User");
const Moviesdata = require("../models/moviesdata");

const auth = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});


module.exports = {

    renderLogin(_, res) {
        res.render("login");
      },
    
      renderRegister(_, res) {
        res.render("register");
      },
      
      renderConfirmation(_,res){
        res.render("confirmation")
      },
    
      renderChangePassword(_, res) {
        res.render("changePassword");
      },
    
      renderDeactivate(_, res) {
        res.render("deactivateAccount");
      },
      

      renderLogout(_, res){
        res.render("logout");
      },

      async homepage(req,res){
        
        Moviesdata.findAll({}).then((data) => {
          res.status(200).send(data);
          // console.log(data.dataValues);
        }).catch((error) => {
          console.log(error);
        });
        
        } ,
      
      async registerUser(req, res) {
        try {
          // user details insertion into a new row into table
          await User.create({ ...req.body });
          //jwt part starts
          const{email,password}= req.body;
          const user = await User.findByEmailAndPassword(email,password);
          username = user.dataValues.name;
          
          if(user){
            const token = jwt.sign(
            {
              user:user.email,
            },
            process.env.JWT_KEY,{
              expiresIn:"24h"
            }
            ) 
            // console.log(token);
            const url = `http://localhost:1234/confirmation/${token}`;
            await transporter.sendMail({
              to: user.email,
              subject: 'confirmation email:please verify your email id to access TOP 100 Movies',
              html:  `hi "${username}" Please click link to confirm your email: <a href="${url}">${url}</a>`,
            });
           
            //jwt part ends
          } 
          
          //try block end
          res.redirect("/login");
        } catch (error) {
          console.log(error);
          if (error.name === "SequelizeValidationError")
            return res.status(400).send(`Validation Error: ${error.message}`);
        }
      },

      async confirmation(req,res){
        try {
          // const {email}=req.body
          const { user } = jwt.verify(req.params.token, process.env.JWT_KEY);
          console.log('im here inside try after 1st line')
          console.log(user);
          
          await User.update({ Isconfirmed: true }, { where:  {email : user}, });
          // console.log('email confirmation update success) 
          //update success
        } catch (e) {
          console.log(e.message);
          // return res.send('error didnt execute try block of confirmation');
          return res.status(400).send("Email confirmation issue");
        }
        // return res.send("didnt enter confirmation try block");
        return res.redirect(`http://localhost:1234/login`);
      },
      
    
      async loginUser(req, res) {
        // Get the users json file
        const { email, password } = req.body; 
        const user = await User.findByEmailAndPassword(email, password);
        // console.log("---------------------------------") 
        // console.log(user.dataValues.Isconfirmed)
        // console.log("---------------------------------") 
        //email confimation check//
        if(!user.dataValues.Isconfirmed)
          return res.status(400).send('please confirm your email to login');    
        if (!email || !password)
          return res.status(400).send("Incorrect credentials");
        try {
          req.session.userId = user.dataValues.id;
          return res.redirect("/home");
        } catch (err) {
          console.log(err.message);
          return res.redirect("/login");
        }
      },
    
      async changePassword(req, res) {
        const { email, oldPassword, newPassword } = req.body;
        if (!email || !oldPassword || !newPassword)
          return res.status(400).send("Bad request");
        try {
          const user = await User.findByEmailAndPassword(email, oldPassword);
          if (!user) {
            return res.status(401).send("Incorrect credentials");
          }
          await user.update({ password: newPassword });
          return res.redirect("/");
        } catch (err) {
          console.log(err.message);
          res.redirect("/change-password");
        }
      },
    
      async deactivateAccount(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).send("Email is required");
        try {
          await User.destroy({ where: { email } });
          return res.redirect("/");
        } catch (err) {
          console.log(err.message);
          res.status(500).send("Server Error");
        }
      },
      

      async logoutUser(req,res){
        
        try{
          if(req.session.userId){
            const user = await User.findByPk(req.session.userId);
            req.user = user.dataValues;
            await req.user.session.destroy();
            return res.redirect("/login");
          }
          // const { email, password } = req.body;
          // const user = await User.findOne({
          //   where: {
          //     email
          //   }
          // });
          // if (user){
          // console.log(req.session.userId);
          // req.session.userId=user.session;  
          // user.session=session;
          // console.log(session);
          await req.session.destroy();
          return res.redirect("/login");
          // }
        } catch (err) {
          console.log(err.message);
          res.status(500).send("server error(unable to logout)");
        }
      }
  
};