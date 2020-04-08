const mongoose = require('mongoose')
const mongoosePginate = require('mongoose-paginate')
const userReview = require('./UserReview')

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
            type:String
            
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
            type:String
           
        },
        original_title:{
            type:String
           
        },
        genre_ids:[
            {
                type:String
            }
        ],
        title:{
            type:String
            
        },
        vote_average:{
            type:Number
        },
        overview:{
            type:String
           
        },
        release_date:{
            type:String
           
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
