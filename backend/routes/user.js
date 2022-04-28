const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const route = require("express").Router();
route.get("/", middlewareController.verifyToken, userController.getAllUsers);
route.delete(
  "/:id",
  middlewareController.verifyToken,
  middlewareController.verifyAdmin,
  userController.deleteUser
);
module.exports = route;
