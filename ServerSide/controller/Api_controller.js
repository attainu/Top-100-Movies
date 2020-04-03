const movieDb = require('../model/movieGener')
const fuzzysearch = require('mongoose-fuzzy-searching')
module.exports = {
    async allMovie (req,res){
        try{
            const {page,perPage,rate,title} = req.query;
            
            const option = {
                page:parseInt(page,10)||1,
                limit:parseInt(perPage,10)||10
            }
            function escapeRegex(text) {
                var name = text || '';
                return name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            };
            const regex = new RegExp(escapeRegex(title), 'gi');
            const movie = await movieDb.paginate({$and:[{title:regex},{vote_average:{$gte:rate||0}}]},option)//()
            return res.json(movie)
        }
        catch(err){
            console.log(err)
            return res.status(500).send(err)
        }
    },
   
        async addMovieData(req,res){
            try {
                const movies_Details = req.body;
                if(!movies_Details){
                    return res.send('Please Enter Some Required Movies Reletaed Data');

                }
            const moviesdataDoc = await  movieDb.create({...movies_Details})
                //console.log(moviesdataDoc)
                
                console.log(req.userData)
            return res.status(201).json({
                statusCode: 201,
                moviesdataDoc             
            });
        }
        catch (err){
            return res.send(err.message)
        }
            
         }

}