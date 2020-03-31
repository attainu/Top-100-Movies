const { Router } = require("express");
const model = require('../model/User')
const { verify } = require('jsonwebtoken')
const User = require('../model/User')
const { authentication, logOutAuth }  = require('../middleware/auth')

const passport = require("passport");
const { register, login, EmailVerification,changePassword, logout } = require("../controller/User_controller/userController");

const router = Router();

router.post("/register", register);

router.post(  "/login",passport.authenticate("local", { session: false }), authentication ,login);

router.post( '/logout',logOutAuth, logout )

//email confirmation route
router.get('/confirmation/:token',EmailVerification)

//change password
router.post('/password/changepassword', authentication ,changePassword)


module.exports = router;



