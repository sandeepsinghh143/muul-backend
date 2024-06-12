const express = require("express");
const { getAllSales, addSale } = require("../controllers/sale.controller");

const app = express();

app.get("/get-all-sales", getAllSales);
app.post("/buy/:userId", addSale);

module.exports = app;
