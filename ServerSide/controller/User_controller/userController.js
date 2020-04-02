const User = require("../../model/User");
const {verify} = require('jsonwebtoken');
const {compare , hash} = require('bcryptjs')
const { sign } = require("jsonwebtoken");
const nodemailer = require('nodemailer')

module.exports = {

  //User Registration Part
  async register(req, res) {
    try {
      const {  name,email, password, dob,city } = req.body;
      if (!email || !name || !password) {
        return res
          .status(400)
          .send({ statusCode: 400, message: "Bad request" });
      }
      const PreUsers = User.findOne({email:email})
      if(PreUsers.email) {
        console.log(`User ${PreUsers.name} already exist`)
       return  res.send(`User ${PreUsers.name} already exist`)
      }
      const user = await User.create({name, email,  password, dob, city });


      //for send mail
      const accessToken =  sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "12h"
      });
      const transport=nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
          user:process.env.EMAIL_SECRATE,
          pass:process.env.EMAIL_PASSWORD_SECRATE
        }
      })
      const url = `http://localhost:1234/confirmation/${accessToken}`
      
        await transport.sendMail({
          to:user.email,
          subject:'100-Movie Email Conformation',
          html:`please click <a href="${url}">this to confirm </a> your mail or Click this URL :<br>${url}"`
        },
        (err,info) =>{
          if(!err){
             console.log('sucess maill sent at '+info.response)
            // res.send('Email sent Your register email at: '+user.email)
          }
                console.log('erroorr:'+err.message)
        }
      )
      

      return res.status(201).json({
        statusCode: 201,
        user,       
        expiresIn: "12h" ,
        message:`Email Sent Your Register Email At:${email}`
        
      });    
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  //USer Login Part
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
      console.log('Confirmation Email sent by your Registered Email  ')
      return res.send("Email Verify First !! Confirmation Email sent on your Registered Email  "+user.email)
      
    }
     
    }
    catch (error) {
      console.log(error.message)
    } 
    },
    

  //user Logout Part
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

    //UserEmail varification Part
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

    //update/change password
    async changePassword (req,res) {
      const {email,oldpassword,newpassword} = req.body
  
      //find that user
      User.findOne({email:email})
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
                     console.log('Password changed ')
                    return  res.send('Password Changes ')
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
  },

  //forget password
  async forgetpassword (req,res)  {
    const {email} = req.body;
    if(!email) {
                console.log('Please Enter Your Register Email');
                return res.send('Please Enter Your Register Email')
                }
        try {
            const {accessToken} = await User.findOne({email:email});
             if(!accessToken){
                    console.log('Sorry no have any token Please Login First')
                    return res.send('Sorry no have any token Please Login First')
             }
        
            const transport=nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth:{
                  user:process.env.EMAIL_SECRATE,
                  pass:process.env.EMAIL_PASSWORD_SECRATE
                }
              })    
              const url = `http://localhost:1234/forgetandnewpassword/${accessToken}`
          
              
                await transport.sendMail({
                  to:email,
                  subject:'100-Movie Forget-Password',
                  html:`please click <a href="${url}">this to confirm </a> your mail or Click this URL :<br>${url}"`
                },
               async (err,info) =>{
                  try{ 
                  if(!err){
                    console.log('sucess maill sent at '+info.response)
                    return res.send('password send by your register email: '+email)
                  }
                   console.log('erroorr:'+err.message)
                }
                   catch(err){
                       console.log(err.message);
                       return res.send('server Error '+err.message)
                   }
                }
              )       
        
    } catch (error) {
        console.log(error.message)
        return  res.send(error.message)
    }
    
},

  //forgetpassword form
  async forgetpasswordform (req,res)  {
    try {
    const { id } = await verify( req.params.token, process.env.JWT_SECRET_KEY)
    
        if(!id) {
            console.log('this Token are not Access, please do again||')
            return res.send('this Token are not Access, please do again||')
        }

        const forgetpasswordData = `
                <form action="/update/password" method="POST" >
                    <input required type="text" name="newpassword" placeholder="new Password" />
                    <input required type="text" name="newCOMpassword" placeholder=" confirm new password"/>
                    <input required type="text" name="city" placeholder="City Name"/>
                    <input required type="submit" value="Update" />
                </form>
        `

        res.send(forgetpasswordData)

    } catch (error) {
        console.log('err:'+error.message)
        return res.send(error.message)
    }
},

    //forget password update controller
    async forgetPasswordUpdate (req,res)  {
      const user = req.body;
      if(!user.oldpassword && !user.newCOMpassword && !user.city){
          console.log('Please Enter all Required Fields')
          return res.send('Please Enter all Required Fields')
      }
      try {
          const {id,name,email,dob,city,password} = await User.findOne({city:user.city})

          if(!city){
              console.log('Your Entered city name Is Wronge . Please chack and and update IT')
          }
              
              if(user.newpassword===user.newCOMpassword){
                 
                  const hashedPassword = await hash(user.newpassword, 10)
                  const{ nModified }=await  User.updateOne({_id:id},{$set:{password:hashedPassword}})  
                              
                 if(nModified==1){
                 
                  return res.status(201).send('Password Changes ')
                 }
                 else{
                     console.log('some error of changing password:DB')
                 }
                  
              }
              else {
                  return res.status(401).send('Invalid old password')
              }
          
      } catch (error) {
        console.log(error.message)  
        return res.send(error.message)
      }
  
  }
   
};
