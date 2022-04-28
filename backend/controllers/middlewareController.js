const jwt = require("jsonwebtoken");
const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    console.log(token);
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.SECRET_KEY, (error, user) => {
        console.log(user);
        if (error) {
          res.status(404).json("Token is not valid");
          return;
        }
        req.user = user;
        next();
      });
    } else {
      res.status(403).json("You are not authenticated");
    }
  },
  verifyAdmin: (req, res, next) => {
    const { isAdmin } = req.user;
    console.log(req.user);
    if (isAdmin || req.user._id === req.params.id) {
      next();
    } else {
      res.status(200).json({ msg: "Your are not allow" });
    }
  },
};
module.exports = middlewareController;
