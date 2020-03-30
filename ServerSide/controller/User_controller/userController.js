const User = require("../../model/User");
const {verify} = require('jsonwebtoken');
const {compare , hash} = require('bcryptjs')


module.exports = {
  async register(req, res) {
    try {
      const {  name,email, password, dob,city } = req.body;
      if (!email || !name || !password) {
        return res
          .status(400)
          .send({ statusCode: 400, message: "Bad request" });
      }
      const user = await User.create({name, email,  password, dob, city });
      const accessToken = await user.generateToken();
      res.status(201).json({
        statusCode: 201,
        user,
        accessToken: `JWT ${accessToken}`,
        expiresIn: "12h"
      });
    
    
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  async login(req, res) {
    try {
      const user = req.user;
     const emailConfirm = user.Isconfirmed     
     if(!emailConfirm==false){
      const accessToken = await user.generateToken();
      console.log('login success at: '+user.email)
      res.json({
        statusCode: 200,
        user,
        accessToken: `JWT ${accessToken}`,
        expiresIn: "12h"
      });

     }
     else {
       res.send("please go to your email inbox and confirm it first")
       console.log('please go to your email inbox and confirm it first')
    }
     
    }
    catch (error) {
      console.log(error.message)
    } 
    },

    async EmailVerification (req,res)  {
      try{
  
        const { id } = verify(req.params.token,process.env.JWT_SECRET_KEY)
        const{ nModified }= await User.updateOne({_id:id},{$set:{Isconfirmed:true}})
         if(nModified == 1){
             console.log('Email verify Success')
           return  res.send('Email Verify Success')
         }
         
      }
      catch (err) {
          console.log(err.message)
      }
     
  },
  async logout(req,res) {
    const { email, password } = req.body
    if(!email || !password){ console.log('please enter email and password') }
    
        try {
            const {accessToken,name} = await User.findByEmailAndPassword(email, password)
            const { id } = verify(accessToken,process.env.JWT_SECRET_KEY)
            const{ nModified }= await User.updateOne({_id:id},{$set:{ accessToken:null}})
             if(nModified == 1){
             console.log('logout Success '+name)
           return  res.send('logout Success')
         }
        } catch (error) {
            console.log(error.message)
            console.log(error)
        }  
    },
    async changePassword (req,res) {
      const {email,oldpassword,newpassword} = req.body
  
      //find that user
      User.findOne({email:email})//.then(function(olduser){}) .then( async (olduser){})
      .then( async (olduser)=>{
          if(!olduser) return res.status(400).send('user does not exist')
          try {
              const {id,password} = olduser
         
         compare(oldpassword, password,async (err,isMatch) => {
              if(err) {
                  return res.status(401).send('unauthorized')
              }
              if(isMatch){
                  console.log(id)
                  const hashedPassword = await hash(newpassword, 10)
                  const{ nModified }=await  User.updateOne({_id:id},{$set:{password:hashedPassword}})  
                  console.log(nModified)             
                 if(nModified==1){
                     console.log('password changed successfull')
                     res.send('password changes success')
                 }
                 else{
                     console.log('some error of changing password:DB')
                 }
                  
              }
              else {
                  return res.status(401).send('Invalid old password')
              }
          })
          }
           catch (error) {
              console.log(error.message)
          }
          
  })
  .catch(err =>{
      res.status(500).send(err)
      console.log(err.message)
  })
  }
   
};
