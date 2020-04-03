const { Router } = require("express");
const { authentication,Regauthentication, logOutAuth ,loginAuth}  = require('../middleware/auth')


const passport = require("passport");
const { register, login, EmailVerification,changePassword, logout ,forgetpassword,forgetpasswordform,forgetPasswordUpdate} = require("../controller/User_controller/userController");

const router = Router();

//user login registration routes
router.post("/register",Regauthentication, register);
router.post(  "/login",passport.authenticate("local", { session: false }),authentication ,login);
router.post( '/logout',logOutAuth, logout )

//all nodemailler/mail routes
router.get('/confirmation/:token',EmailVerification)                    //email varification routes
router.post('/password/changepassword', loginAuth ,changePassword)       //password update routes
router.post('/forgetpassword',authentication,logOutAuth,forgetpassword)   //forget password route
router.get('/forgetandnewpassword/:token',forgetpasswordform)            //forget password form
router.post('/update/password',forgetPasswordUpdate)                    //forget password update route



module.exports = router;



