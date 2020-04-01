const User = require("../models/User");

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
      
      async registerUser(req, res) {
        try {
          await User.create({ ...req.body });
          //jwt part stats
          const{email,password}= req.body;
          const user = await User.findByEmailAndPassword(email,password);
          if(user){
            const token = jwt.sign(
            {
              user:user.email
            },
            process.env.JWT_KEY,{
              expiresIn:"24h"
            }
            ) 
            console.log(token);
            const url = `http://localhost:1234/confirmation/${token}`;
            await transporter.sendMail({
              to: user.email,
              subject: 'confirmation email:please verify your email id to access TOP 100 Movies',
              html:  `Please click link to confirm your email: <a href="${url}">${url}</a>`,
            });
           
            //jwt part ends
          } 
          
          //try block end
          res.redirect("/");
        } catch (error) {
          console.log(error);
          if (err.name === "SequelizeValidationError")
            return res.status(400).send(`Validation Error: ${err.message}`);
        }
      },

      async confirmation(req,res){
        try {
          const { user: { email } } = jwt.verify(req.params.token, process.env.JWT_KEY);
          await user.update({ confirmed: true }, { where: { email } });
        } catch (e) {
          console.log(e.message);
          res.send('error');
        }
        return res.redirect(`http://localhost:1234/login`);
      },
    
      async loginUser(req, res) {
        // Get the users json file
        const { email, password } = req.body;
        // const user = await User.findByEmailAndPassword(email,password);
        
        if (!email || !password)
          return res.status(400).send("Incorrect credentials");
        try {
          const user = await User.findByEmailAndPassword(email, password);
         //email confimation check//
        if(!user.confirmed){
          throw new Error('please confirm your email to login')
        }
          req.session.userId = user.dataValues.id;
          console.log(user.dataValues.id);
          console.log(token);
          res.redirect("/");
        } catch (err) {
          console.log(err.message);
          res.redirect("/login");
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
          const { email, password } = req.body;
          const user = await User.findOne({
            where: {
              email
            }
          });
          if (user){
          console.log(req.session.id);
          req.session.id=user.session;
          user.session=session;
          console.log(session);
          await req.session.destroy();
          return res.redirect("/login");
          }
        } catch (err) {
          console.log(err.message);
          res.status(500).send("server error(unable to logout)");
        }
      }
  
};