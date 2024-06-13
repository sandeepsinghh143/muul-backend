const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./dbConnection");
const PORT = process.env.PORT;
const userRoutes = require("./routes/user");
const salesRoutes = require("./routes/sale");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger-docs.json");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/user", userRoutes);
app.use("/sale", salesRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server is live on PORT: ${PORT}`);
});
