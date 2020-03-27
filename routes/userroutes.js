const { Router } = require('express');
const auth = require("../middleware/authenticate");

const router = Router();
const { loginUser,
     registerUser,
     changePassword,
     deactivateAccount,
     renderLogin,
     renderRegister,
     renderChangePassword,
     renderDeactivate
  } = require ("../controllers/usercontroller");



// Render routes
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/change-password", auth, renderChangePassword);
router.get("/deactivate", auth, renderDeactivate);

// DB routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/change-password", auth, changePassword);
router.post("/deactivate", auth, deactivateAccount);

module.exports = router;