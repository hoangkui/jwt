const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");

const route = require("express").Router();
route.post("/register", authController.registerUser);
route.post("/login", authController.loginUser);
route.post("/refresh", authController.rereshToken);
route.post(
  "/logout",
  middlewareController.verifyToken,
  authController.logoutUser
);

module.exports = route;
