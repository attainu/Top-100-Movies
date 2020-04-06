const mongoose = require('mongoose')
const mongoosePginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const movieGenerSchema = new Schema(
    {
        
        popularity:{
            type:String
        },
        vote_count:{
            type:String
        },
        video:{
            type:Number
        },
        poster_path:{
            type:String,
            require:true
        },
        id:{
            type:Number
        },
        adult:{
            default:false
        },
        backdrop_path:{
            type:String
        },
        original_language:{
            type:String,
            required:true
        },
        original_title:{
            type:String,
            required:true
        },
        genre_ids:[
            {
                type:String
            }
        ],
        title:{
            type:String,
            required:true
        },
        vote_average:{
            type:Number
        },
        overview:{
            type:String,
            required:true
        },
        release_date:{
            type:String,
            required:true
        },
        UserReviews:[
            {
                Name:{
                    type:String
                },
                Email:{
                    type:String
                },
                Reviews:{
                    type:String
                }
            }
        ]
    },
    { timestamps: true }
)
movieGenerSchema.plugin(mongoosePginate)
const movieDb = mongoose.model('MoviesGener', movieGenerSchema, "MoviesGener");

module.exports = movieDb;
