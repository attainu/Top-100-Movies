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
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

User.init(userSchema, {
  sequelize,
  tableName: "users"
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
