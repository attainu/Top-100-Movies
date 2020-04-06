const sequelize = require("../db");
const { Sequelize, Model } = require("sequelize");

class Reviewsdata extends Model {}

const reviewdataSchema = {
    Mid: {
        type:Sequelize.DOUBLE,
      allowNull: false,
      unique: false
    },
    userid: {
        type:Sequelize.DOUBLE,
      allowNull: false,
      unique: true

    },
    useremail: {
        type:Sequelize.TEXT,
      allowNull: false,
      unique: true

    },
    review: {
        type:Sequelize.TEXT,
      allowNull: true
    },
    rating: {
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
