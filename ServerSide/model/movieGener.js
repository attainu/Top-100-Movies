const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieGenerSchema = new Schema(
    {
        
        popularity : {
            type:Number,
            trim:true,
        },
        id : {
            type:String,
            trim:true
        },
        video : {
            defaults:false
        },
        vote_count : {
            type:Number,
            trim:true
        },
        vote_average : {
            type:Number,
            trim:true
        },
        title : {
            type:String,
            required:true
        },
        release_date : {
            type:String,
            required:true
        },
        original_language : {
            type:String,
            trim:"true"
        },
        original_title : {
            type:String,
            required:true
        },
        genre_ids : [
            {
                type:String
            }
            
        ],
        backdrop_path : {
            type:String
        },
        adult : {
            default:false
        },
        overview : {
            type:String
        },
        poster_path : {
            type:String
        }


    }
)



const movieGenerProductSchema = mongoose.model('MoviesGener',movieGenerSchema)
module.exports=movieGenerProductSchema