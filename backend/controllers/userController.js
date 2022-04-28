const User = require("../models/User");
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      // console.log(user);
      res
        .status(200)
        .json({ msg: "Deleted user by id=" + user._id, user: user });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = userController;
