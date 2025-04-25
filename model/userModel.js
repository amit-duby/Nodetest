import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
//   image: {
//     type: String,
//     default: ""
//   },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
    // required: true
  },
  role:{
    type:String,
    enum:["USER","ADMIN"],
    default:"USER",
  }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token method
// UserSchema.methods.getJWTToken = function () {
//   return jwt.sign(
//     { _id: this._id }, 
//     process.env.JWT_SECRET,  // <- should be your JWT secret key
//     { expiresIn: process.env.JWT_EXPIRE } // <- fix spelling to expiresIn
//   );
// };

// Model creation
const userModel = mongoose.model('user', UserSchema);
export default userModel;

