const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { EncodeToken } = require("../utility/tokenHelper");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    let existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ success: false, message: "Email already in use!" });
    }

    let result = await userModel.create({ name, email, password, phoneNumber });

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      result: { id: result._id, name: result.name, email: result.email, phoneNumber: result.phoneNumber },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password!" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password!" });
    }

    let token = EncodeToken(user.email, user._id);

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};

// Get User Profile
exports.profile = async (req, res) => {
  try {
    let user = await userModel.findById(req.user.id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};

// Update User
exports.update = async (req, res) => {
  try {
    let { name, email, phoneNumber, password } = req.body;
    let updatedData = { name, email, phoneNumber };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    let updatedUser = await userModel.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful" });
};

// Upload File (requires multer setup)
exports.upload = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "File uploaded", file: req.file });
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};
