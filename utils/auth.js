import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js"; // make sure .js extension is used if needed
import dotenv from "dotenv";
dotenv.config();

// Middleware to verify authentication
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header('Authorization')?.split(' ')[1];
    console.log(token,"toekdk")
    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded,"decaded user")
    req.user = await userModel.findById(decoded._id).populate('organization');

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid token",
      status: false,
      error: error.message
    });
  }
};

// Middleware to verify admin role
export const isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied: Admins only." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error in admin check", error: error.message });
  }
};
