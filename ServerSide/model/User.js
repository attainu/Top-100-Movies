const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true    
    },
    Isconfirmed:{ 
      type: Boolean,
      default: false 
    },
    dob: {
      type:String,
      trim:true
    },
    city: {
      type:String,
      trim:true
    },
    accessToken: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

userSchema.statics.findByEmailAndPassword = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Incorrect Credentials");
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) throw new Error("Incorrect Credentials");
    return user;
  }
  catch (err) {
    err.name = "AuthError";
    throw err;
  }
};

userSchema.methods.generateToken = async function() {
  const user = this;
  const accessToken = await sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h"
  });
  try {
    const transport=nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth:{
        user:process.env.EMAIL_SECRATE,
        pass:process.env.EMAIL_PASSWORD_SECRATE
      }
    })    
    const url = `http://localhost:1234/confirmation/${accessToken}`

    if(!user.Isconfirmed==true){
      await transport.sendMail({
        to:user.email,
        subject:'100-Movie Email Conformation',
        html:`please click <a href="${url}">this to confirm </a> your mail or Click this URL :<br>${url}"`
      },
      (err,info) =>{
        if(!err) console.log('sucess maill sent at '+info.response)
              console.log('erroorr:'+err.message)
      }
    )
    }
   
    
  }
  catch (e) {console.log(e.message)}
  user.accessToken = accessToken;
  await user.save();
  return accessToken;
};
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.accessToken;
  delete user.__v;
  // Super important
  return user;
};

// I should avoid rehashing the password twice.
userSchema.pre("save", async function(next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      next();
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
