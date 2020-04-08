const User = require("../models/User");
const Moviesdata = require("../models/moviesdata");
const Reviewsdata = require("../models/reviewdata")
const { Op } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:', {
//   operatorsAliases: {
//     $gt: Op.gt
//   }
// });
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
  
      async registerUser(req, res) {
        try {
          // user details insertion into a new row into table
          await User.create({ ...req.body });
          
          //jwt part starts
          const{email,password}= req.body;
          console.log("register--------------")
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
          res.send("please confirm your email to access the page");
        } catch (error) {
          console.log(error);
          if (error.name === "SequelizeValidationError")
          console.log("sequelize validation error");
            return res.status(400).send(`Validation Error: ${error.message} im in register function`);
        }
      },

      async confirmation(req,res){
        try {
          // const {email}=req.body
          const { user } = jwt.verify(req.params.token, process.env.JWT_KEY);
          console.log('im here inside try after 1st line')
          console.log(user);
          console.log(" confirmation ------------")
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
        console.log("loginuser ----------")
        try {

        // console.log("---------------------------------") 
        // console.log(user.dataValues.Isconfirmed)
        // console.log("---------------------------------") 
        //email confimation check//
        
        if (!email || !password)
          return res.send("Incorrect credentials");
          const user = await User.findByEmailAndPassword(email, password);

          if(!user.dataValues.Isconfirmed)
        {
          return res.status(400).send('please confirm your email to login');  
         } 
          console.log("login ----------")
          await User.update({ Isactive: true }, { where:  {email : user}, });
          req.session.userId = user.dataValues.id;
          // console.log(user);
          return res.send("you have logged in successfully to access top rated 100 movies get to /home")
        } catch (err) {
          console.log(err.message);
          return res.send("incorrect credentials");
        }
      },
      
      

      async logoutUser(req,res,next){
          try{
          if(req.session){
             req.session.destroy(function(err){
              if(err){return next(err)}
              else {console.log("you have been loggedout succesfully")}
              return res.send("you have been logged out successfully")
            })
        }
        } catch (err) {
          console.log(err.message);
          res.status(500).send("server error(unable to logout)");
        }
      },
    
      async changePassword(req, res) {
        const { email, oldPassword, newPassword } = req.body;
        if (!email || !oldPassword || !newPassword)
          return res.status(400).send("Bad request");
        try {
          console.log("changepswd -----------------")
          const user = await User.findByEmailAndPassword(email, oldPassword);
          if (!user) {
            return res.status(401).send("Incorrect credentials");
          }
          await user.update({ password: newPassword });
          return res.send("please login password has been updated");
        } catch (err) {
          console.log(err.message);
          res.send("incorrect credentials");
        }
      },
    
      async deactivateAccount(req, res) {
      
        const { email } = req.body;
        if (!email) return res.status(400).send("Email is required");
        try {
          console.log("deactivate account------")
          await User.destroy({ where: { email } });
          return res.redirect("/");
        } catch (err) {
          console.log(err.message);
          res.status(500).send("Server Error");
        }
      },
      //host/-
    async allmovies(req,res){

      Moviesdata.findAll({}).then((data) => {
        const {title} = req.query;
        
        function escapeRegex(text) {
          var name = text || '';
          return name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      };
      const regex = new RegExp(escapeRegex(title), 'gi');
        res.status(200).send(data);
        // console.log(data.dataValues);
      }).catch((error) => {
        console.log(error);
      });
    },
    
    async homepage(req,res){
      // try{
      //   // Get the users json file
      // const { email, password } = req.body; 
      // const user = await User.findByEmailAndPassword(email, password);
        
            Moviesdata.findAll({
              where:{
                // for geners specification
              //   geners :{[Op.substring]:'Action',
              //   [Op.substring]:'Adventure',
              //   [Op.substring]:'Crime',
              //   [Op.substring]:'Mystery',
              //   [Op.substring]:'Science Fiction',
              //   [Op.substring]:'Family',
              //   [Op.substring]:'Fantasy',
              //   [Op.substring]:'Animation'

              // },
                // for rating above 7.5
                 vote_average :{
                   [Op.gte]:7.5}  }
                  }).then((data) => {
              res.status(200).send(data);
              // console.log(data.dataValues);
            }).catch((error) => {
              console.log(error);
            });

            // Moviesdata.
      
      // } catch (error){
      //   console.log(error.message);

      // }
      
      } ,
      async addmovie(req,res){
        try{
          const moviedetails = req.body
          if(!moviedetails){
            return res.send('Please Enter Some Required Movies Reletaed Data');
          }
          const moviedetailsdoc= await Moviesdata.create({...moviedetails})
          
          res.status(201).send("movie has been added",moviedetailsdoc)
        }catch(err){
          console.log(err.message);
          return res.send(err.message);
        }
      },



      async reviewSystem(req,res) {
    
        try { 
              const {email} = req.body
              console.log("review system------")
              const user = await User.findOne({where:email});
              const Userid =  user.dataValues.id;
              const name =   user.dataValues.name;
              const useremail =  user.dataValues.email;
            if(user){
            
            const {review,rate,mid} = req.body;
            console.log("beforemovie id")
            // const movie = await Moviesdata.findAll()
            // const title=movie.dataValues.title;
              // console.log(movie);
              // console.log(user.dataValues.id)
                console.log(req.body.review)
                console.log(rate)
                console.log(req.body)
                        const reviewerData = await Reviewsdata.create({
                        MoviesdatumMid : ,
                        UserId  : Userid,
                        name: name,
                        email: useremail,
                        review:review,
                        rate:rate
                    });
                    
                    return res.status(201).send(reviewerData);
                
               
                }
        }catch (error) {
          return res.send(error.message) ;
    }
  },


  async profile(req,res){
    // const { email, password } = req.body; 
     
    try{
      const user = await User.findByEmailAndPassword(email, password);
      if(user){
        return res.status(200).send(user.dataValues)
      }else{
        return res.send("please login to view the profile")
      }

    }catch(err){
      console.log(err.message)
      return res.status(500).send("Sorry,cannot get your details")
    }

  }

    
      
    
    
        
          
          
};