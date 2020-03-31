const User = require('../model/User')

module.exports ={
    async authentication (req,res,next)  {
    try {
        const {email} = req.body
        const {accessToken,_id} = await User.findOne({email:email})
        if(  !accessToken || accessToken && _id){
                           next()            
            
        }
        res.status(404).send('User Not Found')
        
        
    } catch (error) {
        console.log(error.message)
      return  res.send(error.message)
    }
},
async logOutAuth (req,res,next) {
    try {
        const {email} = req.body
        const {accessToken,_id} = await User.findOne({email:email})
        if(  !accessToken ){
            console.log('this user are not register')
          return  res.send(404).send('this user are not register')
           
        }
        next()
    }
     catch (err){
            console.log(error.message)
            return  res.send(error.message) 
        }                    
    }

}