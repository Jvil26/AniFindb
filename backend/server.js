require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const apiRoutes = require("./routes/api");
const usersRoutes = require("./routes/users");

const app = express();

const PORT = process.env.PORT | 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err, "Mongoose failed to connect");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is disconnected");
});

const apiLimiter = rateLimit({
  windowMs: 1000,
  max: 2,
});

app.use("/api", apiRoutes);
app.use("/api", apiLimiter);
app.use("/users", usersRoutes);

app.listen(PORT, (err) => {
  console.log(err || `App is running on PORT ${PORT}`);
});
