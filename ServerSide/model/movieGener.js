const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieGenerSchema = new Schema(
    {
        Title: {
            type:String,
            require:true
        },
        IMDB_Score: {
            type:Number,
            require:true
        },
        Poster: {
            type:String,
            require:true 
        }
    }
)
const movieGenerProductSchema = mongoose.model('MoviesGener',movieGenerSchema)
module.exports=movieGenerProductSchema