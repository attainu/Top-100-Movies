const User = require("../models/User");


module.exports = {

    renderLogin(_, res) {
        res.render("login");
      },
    
      renderRegister(_, res) {
        res.render("register");
      },
    
      renderChangePassword(_, res) {
        res.render("changePassword");
      },
    
      renderDeactivate(_, res) {
        res.render("deactivateAccount");
      },

      renderLogout(_, res){
        res.render("logout");
      },
      async registerUser(req, res) {
        try {
          await User.create({ ...req.body });
          req.session.userId = user.id;
          res.redirect("/");
        } catch (err) {
          console.log(err);
          if (err.name === "SequelizeValidationError")
            return res.status(400).send(`Validation Error: ${err.message}`);
        }
      },
    
      async loginUser(req, res) {
        // Get the users json file
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).send("Incorrect credentials");
        try {
          const user = await User.findByEmailAndPassword(email, password);
          req.session.userId = user.dataValues.id;
          console.log(user.dataValues.id);
          res.redirect("/");
        } catch (err) {
          console.log(err.message);
          res.redirect("/login");
        }
      },
    
      async changePassword(req, res) {
        const { email, oldPassword, newPassword } = req.body;
        if (!email || !oldPassword || !newPassword)
          return res.status(400).send("Bad request");
        try {
          const user = await User.findByEmailAndPassword(email, oldPassword);
          if (!user) {
            return res.status(401).send("Incorrect credentials");
          }
          await user.update({ password: newPassword });
          return res.redirect("/");
        } catch (err) {
          console.log(err.message);
          res.redirect("/change-password");
        }
      },
    
      async deactivateAccount(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).send("Email is required");
        try {
          await User.destroy({ where: { email } });
          return res.redirect("/");
        } catch (err) {
          console.log(err.message);
          res.status(500).send("Server Error");
        }
      },

      async logoutUser(req,res){
        if(res.session)
        try{
          console.log(req.session.id);
          await req.session.destroy();
          return res.redirect("/login");
        } catch (err) {
          console.log(err.message);
          res.status(500).send("server error(unable to logout)");
        }
      }
  
};