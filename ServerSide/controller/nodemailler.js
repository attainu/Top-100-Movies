module.exports = {
     nodemailer: 
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
  const url = `http://localhost:1234/user/confirmation/${accessToken}`
  await transport.sendMail({
    to:user.email,
    subject:'100-Movie Email Conformation',
    html:`please click <a href="${url}">this to confirm </a> your mail or Click this URL :<br>${url}"`
  },
  (err,info) =>{
    if(!err){
       console.log('sucess maill sent at '+info.response)
      // res.send('Email sent Your register email at: '+user.email)
      return res.status(201).json({
        statusCode: 201,       
        expiresIn: "12h" ,
        message:`Email Sent Your Register Email At:${email}`
        
      });
    }
          console.log('erroorr:'+err.message)
          return res.send("(: Pleae check your Internet connection :)")
  }
)
}