import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js"; // make sure .js extension is used if needed
import dotenv from "dotenv";
dotenv.config();

// Middleware to verify authentication
export const isAuthenticated = async (req, res, next) => {
  try {
    const token= req.cookies.token || req.headers.authorization?.split('')(1)
    if(!token){
        return res.status(400).json("user not login")
    }
    const decaded= jwt.verify(token,process.env.JWT_SECRET)
if(!decaded){
  return res.status(401).json({
    message:'Unauthorize access',
    error:true,
    success:false,
  })
}
console.log(decaded,"deaded")
    const newUser= await userModel.findById(decaded.id);
    // console.log(newUser,"find user id");
    if(!newUser){
      res.status(400).json({
        message:"Invalid user"
      })
    }
    req.user=newUser
    req.userId= decaded.id;
    next()
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
