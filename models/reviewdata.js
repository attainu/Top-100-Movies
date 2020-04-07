const sequelize = require("../db");
const { Sequelize,DataTypes, Model } = require("sequelize");



// according to sir lecture


// const sequelize = require("../db");
// const { Sequelize, Model } = require("sequelize");

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



// according to documentation of sequelize
// Reviewsdata.associate = function(Model){

// }
// const Reviewsdata = sequelize.define('', {
//   Mid: {
//     type:DataTypes.DOUBLE,
//   allowNull: true,
//   unique: false
// },
// userid: {
//     type:DataTypes.DOUBLE,
//   allowNull: true,
//   unique: true,
//   primarykey: true

// },
// title: {
//   type:DataTypes.TEXT,
// allowNull: true,
// unique: false

// },
// email: {
//     type:DataTypes.TEXT,
//   allowNull: true,
//   unique: true

// },
// review: {
//     type:DataTypes.TEXT,
//   allowNull: true
// },
// rate: {
//     type:DataTypes.DOUBLE,
//   allowNull: true

// }
// }, {
//   tableName: 'Moviereviews'}
// );

// module.exports = Reviewsdata;






