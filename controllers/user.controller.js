const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const BCRYPT_SALTS = Number(process.env.BCRYPT_SALTS);

// POST - Register User
const registerUser = async (req, res) => {
  // Data Validation
  const isValid = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid Input",
      data: isValid.error,
    });
  }

  try {
    const userExists = await User.find({ email: req.body.email });

    if (userExists.length != 0) {
      return res.status(400).send({
        status: 400,
        message: "Email already exists",
      });
    }
  } catch (err) {
    return res.status(400).send({
      status: 400,
      message: "Error while checking username and email exists",
      data: err,
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, BCRYPT_SALTS);

  const userObj = new User({
    name: req.body.name,
    age: req.body.age,
    password: hashedPassword,
    email: req.body.email,
  });

  try {
    await userObj.save();

    return res.status(201).send({
      status: 201,
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(400).send({
      status: 400,
      message: "Error while save user to DB",
      data: err,
    });
  }
};

// POST - Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const isValid = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid Username/password",
      data: isValid.error,
    });
  }

  let userData;

  try {
    userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).send({
        status: 400,
        message: "No user found! Please register",
      });
    }
  } catch (err) {
    return res.status(400).send({
      status: 400,
      message: "Error while fetching user data",
      data: err,
    });
  }

  const isPasswordSame = await bcrypt.compare(password, userData.password);

  if (!isPasswordSame) {
    return res.status(400).send({
      status: 400,
      message: "Incorrect Password",
    });
  }

  const payload = {
    age: userData.age,
    name: userData.name,
    email: userData.email,
    userId: userData._id,
  };

  return res.status(200).send({
    status: 200,
    message: "User Logged in successfully",
    data: payload,
  });
};

const getAllUsers = async (req, res) => {
  let usersData;

  try {
    usersData = await User.find();

    if (!usersData) {
      return res.status(400).send({
        status: 400,
        message: "Failed to fetch all users",
      });
    }
  } catch (err) {
    return res.status(400).send({
      status: 400,
      message: "Failed to fetch all users",
      data: err,
    });
  }

  return res.status(200).send({
    status: 200,
    message: "All users fetched succesfully",
    data: usersData,
  });
};

module.exports = { registerUser, loginUser, getAllUsers };
