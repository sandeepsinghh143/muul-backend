const Joi = require("joi");
const Sale = require("../models/salesSchema");

const addSale = async (req, res) => {
  const isValid = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    status: Joi.string().required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid Input",
      error: isValid.error,
    });
  }

  try {
    const saleObj = new Sale(req.body);
    await saleObj.save();
    res.status(200).send({
      status: 200,
      message: "successfully purchased",
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getAllSales = async (req, res) => {
  let sales;
  try {
    sales = await Sale.find();
    if (sales.length === 0) {
      return res.status(400).send({
        status: 400,
        message: "no products found",
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: "Something went wrong",
      error: error,
    });
  }

  return res.status(200).send({
    status: 200,
    message: "sales fetched successfully",
    data: sales,
  });
};

module.exports = { addSale, getAllSales };
