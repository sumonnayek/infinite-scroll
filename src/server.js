const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
let path = require("path");
let createError = require("http-errors");

let app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost:27017/messages")
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log(`Could not connect to the database. Exiting now...${err}`);
    // process.exit();
  });

const PostModel = mongoose.model("post", {
  title: String,
  image: String,
  desc: String,
});

app.get("/post", async (request, response) => {
  try {
    let result = await PostModel.find().exec();
    response.send(result);
    console.log(response);
  } catch (error) {
    response.status(500).send(error);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Setup server port
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening at :" + port);
});

