const userModels = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //Check name if exists
  const checkName = await userModels.findOne({
    where: { name: name },
  });
  if (checkName !== null) return res.status(409).json("User is already exists");

  //Check email if exists
  const checkEmail = await userModels.findOne({
    where: { email: email },
  });
  if (checkEmail !== null)
    return res.status(409).json("Email is already exists");

  // register user
  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  //create user
  try {
    await userModels.create({ name, email, password: hash });
    res.status(201).json("User registered successfully");
  } catch (error) {
    res.status(500).json(error.errors[0].message);
  }
};

const login = async (req, res) => {
  // check for name
  const UserData = await userModels.findOne({
    where: { name: req.body.name },
  });
  if (UserData === null) return res.status(409).json("User Not Found");

  //check password
  const isValidPassword = bcrypt.compareSync(
    req.body.password,
    UserData.password
  );
  if (!isValidPassword)
    return res.status(400).json("User OR password Not Valid");

  const token = jwt.sign({ id: UserData.id }, "jwtkey");
  const userData = {
    id: UserData.id,
    name: UserData.name,
    email: UserData.email,
  };
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(userData);
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User is logout");
};

module.exports = { register, login, logout };
