require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const apiRoutes = require("./routes/api");
const usersRoutes = require("./routes/users");

const app = express();

const PORT = process.env.PORT | 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoose connected"));

const apiLimiter = rateLimit({
  windowMs: 1000,
  max: 2,
});

app.use("/api", apiRoutes);
app.use("/api", apiLimiter);
app.use("/users", usersRoutes);

app.set("port", PORT);

//For avoidong Heroku $PORT error
app
  .get("/", function (request, response) {
    var result = "App is running";
    response.send(result);
  })
  .listen(app.get("port"), function () {
    console.log(
      "App is running, server is listening on port ",
      app.get("port")
    );
  });
