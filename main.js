const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

dotenv.config();

const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res) {
    res.set("x-timestamp", Date.now());
  },
};
app.use(express.static("public", options));
app.use(fileUpload());
app.use(express.json({ extended: true }));

app.use("/", express.static(path.join(__dirname, "build")));
app.get("/about-us", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "about", "index.html"));
});

app.use("/", require("./routes.js"));
app.use("/api", require("./admin.routes.js"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

async function start() {
  await mongoose
    .connect(process.env.MONGO__URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log(err));

  app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running");
  });
}

start();
