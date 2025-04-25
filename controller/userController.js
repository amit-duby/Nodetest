import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
export const usercontroller=async(req,res)=>{
    try{
       const {name,email,password}=req.body;

       const user=await userModel({
        name,email,password
       })
       const userSave=await user.save();
       res.status(200).json({
        status:true,
        message:"user is created",
        user
       })
    }catch(error){
        res.status(400).json({
            message:"user does not created ",
            error:error,
            status:false
        })
    }
}

// login user



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({
        message: "Email or password not match"
      });
    }

    // Compare password (call instance method)
    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword) {
      return res.status(401).json({ message: "Email or password not matched" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Remove password before sending user info
    user.password = undefined;

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true only in production
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({
      status: true,
      user,
      token,
      message: "User login successful"
    });

  } catch (error) {
    return res.status(500).json({
      message: "User login failed",
      error: error.message,
      status: false
    });
  }
};


// LOGOUTuSE
export const logoutuser=async(req,res)=>{
    try{
       await res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
    }catch(error){
        return res.status(401).json({
            message:"user not logout",
            status:false,
            error:error,
        })
    }
}

// getall user 
 export const getallUser=async(req,res)=>{
    try{
    const user = await userModel.find();
    res.status(200).json({
        status:true,
        user,
        message:'user find successfully',
    })
    }catch(error){
      return   res.status(401).josn({
            message:"user get error",
            status:false,
           error:error
        })
    }
 }


//  getUserById
export const getUserById=async(req,res)=>{
    try{
    const user = await userModel.findById(req.params.id);
    res.status(200).json({
        status:true,
        user,
        message:'user find successfully',
    })
    }catch(error){
      return   res.status(401).josn({
            message:"user get error",
            status:false,
           error:error
        })
    }
 }

 export const updateUserById=async(req,res)=>{
    try{
        const {name,email}=req.body
    const user = await userModel.findById(req.params.id);
   if(!user){
    return res.status(401).json({
        message:"user not found using this id",

    })
   }

    const update=await userModel.findByIdAndUpdate(req.params.id,{name,email})
    res.status(200).json({
        status:true,
        update,
        message:'user updated successfully',
    })
    }catch(error){
      return   res.status(401).josn({
            message:"user get error",
            status:false,
           error:error
        })
    }
 }


//  delete user
export const deleteUserById=async(req,res)=>{
    try{
        
//     const user = await userModel.findById(req.params.id);
//    if(!user){
//     return res.status(401).json({
//         message:"user not found using this id",
        
//     })
//    }

    const user=await userModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:true,
    
        message:'user deleted successfully',
    })
    }catch(error){
      return   res.status(401).josn({
            message:"user get error",
            status:false,
           error:error
        })
    }
 }