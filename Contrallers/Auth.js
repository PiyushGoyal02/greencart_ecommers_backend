const UserModel = require("../Model/LoginSignupModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Signup section
exports.Signup = async (req, res) => {
  try {
    const { name, surname, email, password, accountType } = req.body;

    // Validate input
    if (!name || !surname || !email || !password || !accountType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // AccountType Set lowercase
    const normalizedAccountType = accountType.toLowerCase();

    // Check for valid accountType
    if (!["admin", "user"].includes(normalizedAccountType)) {
      return res.status(400).json({
        success: false,
        message: "Account type must be either 'admin' or 'user'.",
      });
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email already exists.",
      });
    }

    // We are hashing our password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User
    const newUser = await UserModel.create({
      name,
      surname,
      email,
      password: hashedPassword,
      accountType: normalizedAccountType,
    });


    const payload = {
      id: newUser._id,
      email: newUser.email,
      accountType: newUser.accountType,
    };

    const token = JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, { httpOnly: true }).status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: newUser,
    });

  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Signup failed. Please try again.",
    });
  }
};

// User login section
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });

    // Check validation for email and password
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please create an account.",
      });
    }

    // Check if the account type is user
    if (user.accountType !== "user") {
      return res.status(403).json({
        success: false,
        message: "Access denied. This is not a user account.",
      });
    }

    // Compare password from fom data and backend password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    const token = JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      userId: user._id,
      user,
    });
  } catch (error) {
    console.error("User Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "User login failed. Please try again.",
    });
  }
};

// Admin login section
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if admin exists
    const admin = await UserModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found. Please create an account.",
      });
    }

    // Check if the account type is admin
    if (admin.accountType !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. This is not an admin account.",
      });
    }

    // Compare password from for data and backend password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      accountType: admin.accountType,
    };

    const token = JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      adminId: admin._id,
      admin,
    });
    
  } catch (error) {
    console.error("Admin Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Admin login failed. Please try again.",
    });
  }
};
