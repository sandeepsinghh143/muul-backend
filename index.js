const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./dbConnection");
const PORT = process.env.PORT;
const userRoutes = require("./routes/user");
const salesRoutes = require("./routes/sale");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.use("/sale", salesRoutes);

app.listen(PORT, () => {
  console.log(`Server is live on PORT: ${PORT}`);
});
