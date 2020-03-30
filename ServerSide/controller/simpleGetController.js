const moviegenerschema = require('../model/movieGener')
module.exports={
    moviecontroller:async (_,res) => {
        try {
            const moviedata = await moviegenerschema
            .find({})
            
            
        } catch (error) {
            console.log(error.message)
        }
       
        
      
    },
    moviecont: async (req,res,next) => {
        
        next()
    }
}