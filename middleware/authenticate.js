var User = require("../models/User");

module.exports = async (req, res, next) => {
  console.log('Authentication Processing')
  try {
    if (req.session.userId) {
      const user = await User.findByPk(req.session.userId);
      if (!user) return res.redirect("/login");
      req.user = user.dataValues;
      return next();
    }
    return res.redirect("/login");
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
