const { Router } = require('express');
const auth = require("../middleware/authenticate");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
 
const router = Router();
const { loginUser,
     registerUser,
     changePassword,
     deactivateAccount,
     renderLogin,
     renderRegister,
     renderChangePassword,
     renderDeactivate,
     renderLogout,
     renderConfirmation,
     confirmation
  } = require ("../controllers/usercontroller");



// Render routes
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/change-password", auth, renderChangePassword);
router.get("/deactivate", auth, renderDeactivate);
router.get("/logout",renderLogout);
router.get("/confirmation/:token",confirmation);
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
// router.post("/logout",renderLogout);

module.exports = router;