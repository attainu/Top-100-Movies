const User = require("../models/User");
const Moviesdata = require("../models/moviesdata");
const Reviewsdata = require("../models/reviewdata")
const { Op } = require("sequelize");
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
  async reviewSystem(req,res) {
        
    try {
       const user = await User.findOne({
        where: {
          email,
         
        } 
      });
        let id = user.dataValues.id;
        let name = user.dataValues.name;
        let email = user.dataValues.email;
        
        const {title,mid,review,rate} = req.body;
        const confirm  = await Reviewsdata.findOne({$and : [ {movie_id:mid},{user_id:id} ]})   
    if(!confirm) {
        if (title && mid){
            const matchingmoviesTitle = await  Moviesdata.findOne({$and:[ {title:title},{mid:mid} ]})
            if(matchingmoviesTitle){
            if(review || rating){
                    const reviewSys = await Reviewsdata.create({
                    "movie_id" : mid,
                    "user_id"  : id,
                    "Movie_title":title,
                    "user_name": name,
                    "user_email": email,
                    "review": review,
                    "rate":rate
                })
                
                let {vote_count,vote_average,UserReviews} = await Moviesdata.findOne({_id :mid}) 
               
               const findMovie = await Moviesdata.findOne({mid:mid})
               if(!findMovie){return res.send('Movies Id Not Found ')}
               var userR = new  Moviesdata({UserReviews:[{Name:name},{Email:email},{Reviews:review}]})
                userR.save((err,save)=>{
                    if(!err){console.log('success')} console.log('err')
                })
              
                 let averageVote = parseInt(vote_average)                  
                let voters =parseInt( vote_count);                   
                
                //update rating
                    //  where:
    //   R = average for the movie (mean) = (Rating)
    //   v = number of votes for the movie = (votes)
    //   m = minimum votes required to be listed in the Top 250 (currently 1250)
    //   C = the mean vote across the whole report (currently )
                let R = rate;
                let v = voters;
                let m = 1250;
                let C = averageVote
                
                var rank  = (v / (v+m)) * R + (m / (v+m)) * C;
                var inputValue=rank.toString()           
                var afterDot = '';
                var beforeDots = inputValue.split('.'); 
                var beforeDot = beforeDots[0];
                if(beforeDots[1]){
                     var afterDot = beforeDots[1];
                        if(afterDot.length > 3 ){
                        afterDot = afterDot.slice(0, 2);               
                        }
                afterDot = '.'+ afterDot;
    
        }
        if(beforeDot){                  
            if(beforeDot.length > 6 ){          
                beforeDot = beforeDot.slice(0, 6);                      
            }
            if(beforeDots[1] == ''){
                beforeDot = beforeDot + '.';
            }
        }
        inputValue = beforeDot + afterDot;
        voters =parseInt( vote_count)+1
        await Moviesdata.updateOne({_id:_id},{vote_average:inputValue})
        await Moviesdata.updateOne({_id:_id},{vote_count:voters})           
                   
    
                return res.status(201).json({
                    statusCode: 201,
                    reviewSys
                             
                });
            }
        
            else{
                return res.send('please give me rating or review')
            }
        }
        else {
            return res.send('Id And Title are not matched')
        }
        }
        else {
            return res.send('please enter the title or id something !')
        }
    }
    else {
        return res.send('Please Dont Do this Duplicate!!!')
    }
    } catch (error) {
        return res.send(error.message)
    }
},


    
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
      async addreview(req,res){

      },
      async homepage(req,res){
        // try{
        //   // Get the users json file
        // const { email, password } = req.body; 
        // const user = await User.findByEmailAndPassword(email, password);
          // if(user.dataValues.Isactive == true)
        //   {
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
                res.status(200).send(json(data));
                // console.log(data.dataValues);
              }).catch((error) => {
                console.log(error);
              });

              // Moviesdata.
        // }
        // } catch (error){
        //   console.log(error.message);

        // }
        
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
          await User.update({ Isactive: true }, { where:  {email : user}, });
          req.session.userId = user.dataValues.id;
          return res.redirect("/home");
        } catch (err) {
          console.log(err.message);
          return res.redirect("/login");
        }
      },
      
      

      async logoutUser(req,res){
        // Get the users json file
        // const { email, password } = req.body; 
        // const user = await User.findByEmailAndPassword(email, password);
        // if(user){
        //   await User.update({ Isactive: false }, { where:  {email : user}, });
        //   }
        try{
          if(req.session.userId){
            const user = await User.findByPk(req.session.userId);
            req.user = user.dataValues;
            await req.session.destroy();
            await User.update({ Isactive: false }, { where:  {email : user}, });
            return res.redirect("/login");
          }
          return res.redirect("/login");
          // }
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
      }
  
};