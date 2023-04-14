const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI);
cloudinary.config({
  cloud_name: process.env.COULDINARY_CLOUD_NAME,
  api_key: process.env.COULDINARY_API_KEY,
  api_secret: process.env.COULDINARY_API_SECRET,
  secure: true,
});

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");

app.use(userRoutes);
app.use(offerRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Cette route n'est pas définie");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Serveur Started");
});
