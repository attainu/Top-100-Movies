const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");

class Reviewsdata extends Model {}

const reviewdataSchema = {
    Mid: {
        type:Sequelize.DOUBLE,
      allowNull: true,
      unique: false
    },
    userid: {
        type:Sequelize.DOUBLE,
      allowNull: true,
      unique: true,
      primarykey: true

    },
    title: {
      type:Sequelize.TEXT,
    allowNull: true,
    unique: false

  },
    email: {
        type:Sequelize.TEXT,
      allowNull: true,
      unique: true

    },
    review: {
        type:Sequelize.TEXT,
      allowNull: true
    },
    rate: {
        type:Sequelize.DOUBLE,
      allowNull: true

    }

};


// Reviewsdata.associate = function(Model){

// }

Reviewsdata.init(reviewdataSchema, {
    sequelize,
    tableName:"Moviereviews"
})
module.exports = Reviewsdata;
