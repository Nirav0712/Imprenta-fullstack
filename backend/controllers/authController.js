import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { createNotification } from "./notificationController.js";

/*
  @desc Register Admin/User
  @route POST /api/auth/register
  @access Public (Later Admin Only)
*/

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, companyName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      companyName,
      role: role || "user",
    });

    if (user.role === "user") {
      await createNotification({
        type: "new_user",
        title: "New User Registered",
        message: `A new customer account was created by ${name}.`,
        entityId: user._id,
        entityType: "user",
        customerName: name,
        priority: "normal",
      });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        companyName: user.companyName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
  @desc Login User
  @route POST /api/auth/login
  @access Public
*/

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        companyName: user.companyName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
  @desc Update User Profile
  @route PUT /api/auth/profile
*/
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.companyName = req.body.companyName || user.companyName;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        companyName: updatedUser.companyName,
        role: updatedUser.role,
      },
      message: "Profile updated successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/*
  @desc Get all users (Admin only)
  @route GET /api/auth/users
*/
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/*
  @desc Update User Role/Status
  @route PUT /api/auth/users/:id
*/
export const updateUserRole = async (req, res) => {
  try {
    const { role, isActive } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.role = role || user.role;
    if (isActive !== undefined) user.isActive = isActive;
    await user.save();

    res.status(200).json({ success: true, message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/*
  @desc Delete User
  @route DELETE /api/auth/users/:id
*/
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    await user.deleteOne();

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get user cart
// @route GET /api/auth/cart
// @access Private
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, cart: user.cart || [] });
  } catch (error) {
    console.error("Fetch Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc Update user cart
// @route PUT /api/auth/cart
// @access Private
export const updateCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.cart = cart || [];
    await user.save({ validateBeforeSave: false }); // Skip validation just in case

    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};