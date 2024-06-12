const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log(err));
