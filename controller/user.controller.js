const { User } = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/key");
const jwt = require("jsonwebtoken");

// Sign Up
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  //Validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill in all field" });
  }
 
  // check if user exists
  const newEmail = await User.findOne({ email: email });

  if (newEmail) {
    return res.status(422).json({ error: "Email already registered" });
  }
  
  const hashPassword = await bcrypt.hash(password, 15);
  const newUser = User.create({ username, email, password: hashPassword });
  return res.status(201).json('User Successfully Created');
};

//  Sign In
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Fill complete fields");
  }
  // check if user exist
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("User does not exist");
  }
  // compare passwords
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(400).send("Incorrect Email or Password");
  }
  const payload = { id: user._id };
  // user jwt
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
console.log(token)
  return res
    .status(200)
    .json({ message: "Login Successful", email: user.email, access: token });
};

module.exports = { registerUser, loginUser };
