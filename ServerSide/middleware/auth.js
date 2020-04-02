const User = require('../model/User')

module.exports ={
    async authentication (req,res,next)  {
        try {
            const {email} = req.body
            const {accessToken,_id} = await User.findOne({email:email})
            
            if(_id){
                if(accessToken || !accessToken){
                    return next()
                }
                return res.send('You have Not Login Here')
            }
            else return res.send('No User Found')
            
        } catch (error) {
        console.log("Error:"+error.message)
      
    }
},
async logOutAuth (req,res,next) {
    try {
        const {email} = req.body
        const {accessToken,_id} = await User.findOne({email:email})
        if(_id){
            if(accessToken){
                return next()
            }
            return res.send('You have Not Login Here')
        }
        else return res.send('No User Found')
        
    }
     catch (err){
            console.log(error.message)
            return  res.send(error.message) 
        }                    
    },
    async loginAuth (req,res,next) {
        const {email,oldpassword,newpassword} =req.body ;
        if(!email || !oldpassword || !newpassword){
            console.log('INvalid Credentials')
            return res.send('Invalid Credentials')
        }
        try {
            const {accessToken} = await User.findOne({email:email})
            
            if(!accessToken==null){
                return next()
            } 
            console.log('login First')
            return res.send('Login First')
        }
        catch(err){
            console.log(err.message)
        }
        
    },
    async authentication (req,res,next)  {
        try {
            const user = req.body
            const {email} = await User.findOne({email:user.email})
            if(email){
                console.log('Email already Register')
                return res.send('Email Already Registerd')
            }
            return next()

        } catch (error) {
            console.log("Error:"+error.message)
          
        }
    }    
    
}

