const userModels = require("../models/users");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  //Check name and email if exists
  const checkName = await userModels.findOne({
    where: { name: name },
  });
  if (checkName !== null) return res.status(409).json("User is already exists");
  const checkEmail = await userModels.findOne({
    where: { email: email },
  });
  if (checkEmail !== null)
    return res.status(409).json("Email is already exists");
  // register user
  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const newUser = await userModels.create({ name, email, password: hash });
    res.status(201).json("User registered successfully");
  } catch (error) {
    res.status(500).json(error.errors[0].message);
  }
};
module.exports = { register };
