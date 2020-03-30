const { Router } = require("express");
const model = require('../model/User')
const { verify } = require('jsonwebtoken')
const User = require('../model/User')


const passport = require("passport");
const { register, login, EmailVerification,changePassword, logout } = require("../controller/User_controller/userController");

const router = Router();

router.post("/register", register);

router.post(  "/login",passport.authenticate("local", { session: false }),login);

router.post( '/logout', logout )

//email confirmation route
router.get('/confirmation/:token',EmailVerification)

//change password
router.post('/password/changepassword',changePassword)


module.exports = router;



