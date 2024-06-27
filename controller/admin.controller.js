const { Admin, Admin } = require("../models/admin.model");
const bcrypt = require("bcrypt");
const { JWT_SECRET_ADMIN } = require("../config/key");
const jwt = require("jsonwebtoken");

// Sign Up
const registerAdmin = async (req, res) => {
  const { admin, password } = req.body;
  //Validation
  if ( !admin || !password) {
    return res.status(400).json({ error: "Please fill in all field" });
  }
 
  // check if user exists
  const newAdmin = await User.findOne({ admin: admin });

  if (newAdmin) {
    return res.status(422).json({ error: "Admin already registered" });
  }
  
  const hashPassword = await bcrypt.hash(password, 15);
  const addNewAdmin = await Admin.create({ username, email, password: hashPassword });
  return res.status(201).json('Admin Successfully Created');
};

//  Sign In
const loginAdmin = async (req, res) => {
  const { admin, password } = req.body;
  if (!admin || !password) {
    return res.status(400).send("Fill complete fields");
  }
  // check if user exist
  const checkAdmin = await Admin.findOne({ admin: admin });
  if (!checkAdmin) {
    return res.status(400).send("Admin does not exist");
  }
  // compare passwords
  const passwordValid = await bcrypt.compare(password, checkAdmin.password);
  if (!passwordValid) {
    return res.status(400).send("Incorrect Email or Password");
  }
  const payload = { id: checkAdmin._id };
  // user jwt
  const token = jwt.sign(payload, JWT_SECRET_ADMIN, { expiresIn: "1h" });
  return res
    .status(200)
    .json({ message: "Login Successful", checkAdmin: checkAdmin.email, accessAdmin: token });
};

module.exports = { registerAdmin, loginAdmin };
