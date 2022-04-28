const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const jsonwebtoken = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// connect to mongodb

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to database!");
});
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
