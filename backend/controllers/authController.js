const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
const authController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const newUser = await new User({
        username: username,
        email: email,
        password: hashed,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  generateToken: (user, key, time) => {
    return jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      key,
      { expiresIn: time }
    );
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Username not found");
        return;
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password");
        return;
      }
      if (user && validPassword) {
        const accessToken = authController.generateToken(
          user,
          process.env.SECRET_KEY,
          "30s"
        );
        const refreshToken = authController.generateToken(
          user,
          process.env.REFRESH_KEY,
          "30d"
        );
        refreshTokens.push(refreshToken);
        const { password, ...others } = user._doc;
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          scure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({
          msg: "Login success",
          user: others,
          accessToken,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  rereshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshTokens.includes(refreshToken)) {
      return res
        .status(403)
        .json("Refresh token is not valid (not include DB)");
    }
    jwt.verify(refreshToken, process.env.REFRESH_KEY, (error, user) => {
      if (error) {
        return res.status(403).json("Refresh token is not valid");
      }

      // return res.status(200).json(user);
      const newAccessToken = authController.generateToken(
        user,
        process.env.SECRET_KEY,
        "30s"
      );
      const newRefreshToken = authController.generateToken(
        user,
        process.env.REFRESH_KEY,
        "30d"
      );
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        scure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
    // console.log(refreshToken);
  },
  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json("Logout");
  },
};
module.exports = authController;
