const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { errorHandler } = require("../middlewares/error.middleware");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    errorHandler(error, res);
  }
};

function passwordChecker(pass) {
  if (pass.length < 8) {
    return false;
  }

  const aplhabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = "1234567890";
  const special = "!@#$%^&*()_+,./{}[]|;:";
  const flag1 = false;
  const flag2 = false;
  const flag3 = false;

  for (let i = 0; i < pass.length; i++) {
    if (aplhabet.includes(pass[i])) {
      flag1 = true;
    }
    if (number.includes(pass[i])) {
      flag2 = true;
    }
    if (special.includes(pass[i])) {
      flag3 = true;
    }
  }

  return flag1 && flag2 && flag3;
}

module.exports = { registerUser, loginUser };
