const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "UnAuthorized" });
  }
  //   console.log(req.headers.authorization);
  const token = req.headers.authorization.replace("Bearer ", "");
  // console.log(token);

  const user = await User.findOne({ token }).select("account _id avatar");

  if (user === null) {
    res.status(401).json({ message: "UnAuthorized" });
  }

  req.user = user;

  next();
};

module.exports = isAuthenticated;
