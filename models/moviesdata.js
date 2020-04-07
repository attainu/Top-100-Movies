const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");

class Moviesdata extends Model {
        // static async findbyrating(vote_average){
        // try {
        //     const rating = await Moviesdata.findAll({
        //         where: {
        //             vote_average
        //         }
        //     }).then((data) => {
        //         this.restore.status(200).send(data);
        //         return rating;
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        // //   console.log(moviesdata);  
        // } catch (error) 
        // {
        //    throw error; 
        // }
    // }
  
}

const moviesdataSchema = {
    budget:{
      type:Sequelize.BIGINT,
      allowNull: true
    },
    geners:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    homepage:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    keywords:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    original_language:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    original_title:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    popularity:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    production_companies:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    production_countries:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    release_date:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    revenue:{
      type:Sequelize.DOUBLE,
      allowNull: true
    },
    runtime:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    spoken_language:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    status:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    tagline:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    title:{
      type:Sequelize.TEXT,
      allowNull: true
    },
    vote_average:{
      type:Sequelize.DOUBLE,
      allowNull: true
    },
    vote_count:{
      type:Sequelize.DOUBLE,
      allowNull: true
    },
    mid:{
      type:Sequelize.DOUBLE,
      allowNull: true,
      unique: true,
      
      primaryKey: true
    }
  
  };
  Moviesdata.init(moviesdataSchema, {
    sequelize,
    tableName: "moviesdata"
  });
  

  module.exports = Moviesdata;