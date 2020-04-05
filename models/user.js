const sequelize = require("../db");
const { hash, compare } = require("bcryptjs");
const { Sequelize, Model } = require("sequelize");

class User extends Model {
  static async findByEmailAndPassword(email, password) {
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (!user) throw new Error("Incorrect credentials");
      const isMatched = await compare(password, user.password);
      if (!isMatched) throw new Error("Incorrect credentials");
      return user;
    } catch (err) {
      throw err;
    }
  }
}

const userSchema = {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  
  Isconfirmed:{
    type:Sequelize.BOOLEAN,
    default: false,
    allowNull: true
    
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dob: {
    type: Sequelize.STRING,
    allowNull: false
  }

};



class Moviesdata extends Model {
  static async findByEmailAndPassword(email, password) {
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (!user) throw new Error("Incorrect credentials");
      const isMatched = await compare(password, user.password);
      if (!isMatched) throw new Error("Incorrect credentials");
      return user;
    } catch (err) {
      throw err;
    }
  }
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

User.init(userSchema, {
  sequelize,
  tableName: "users"
});

Moviesdata.init(moviesdataSchema, {
  sequelize,
  tableName: "moviesdata"
});

User.beforeCreate(async user => {
  const hashedPassword = await hash(user.password, 10);
  user.password = hashedPassword;
});

User.beforeUpdate(async user => {
  if (user.changed("password")) {
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
  }
});

module.exports = User;
module.exports = Moviesdata;