const { Router } = require('express');
const auth = require("../middleware/authenticate");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
 
const router = Router();
const { allmovies,
      reviewSystem,
      addreview,
      loginUser,
     registerUser,
     changePassword,
     deactivateAccount,
     homepage,
     confirmation,
     logoutUser,
     
     
  } = require ("../controllers/usercontroller");



// Render routes
router.get("/login", loginUser);
router.get("/register", registerUser);
router.get("/change-password", auth, changePassword);
router.get("/deactivate", auth, deactivateAccount);
router.get("/logout",auth,logoutUser);
router.get("/confirmation/:token",confirmation);
router.get("/home",auth,homepage);
router.get("/",allmovies);
router.get("/rateandreview",auth,reviewSystem);

// router.get('/logout', function(req, res, next) {
//   if (req.session) {
//     console.log(req.session.id);
//     // delete session object
//     req.session.destroy(function(err) {
//       if(err) {
//         return next(err);
//       } else {
//         console.log("you have been logged out succesfully");
//         return res.redirect('/login');
//       }
//     });
//   }
// });

// DB routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/change-password", auth, changePassword);
router.post("/deactivate", auth, deactivateAccount);
router.post("/logout",auth,logoutUser);
router.post("/confirmation/:token",confirmation);
router.post("/rateandreview",reviewSystem);


module.exports = router;