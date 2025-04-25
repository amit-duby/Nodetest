import auditModel from "../model/auditModel.js";
import fileModel from "../model/FileModel.js";
import path from "path";
export const fileUploader = async (req, res) => {
  try {
    

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
        status: false,
      });
    }

    const file = req.file.path;
    const userId = req.userId; 

   
    
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized. User info not found.",
        status: false,
      });
    }

    const fileupload = await fileModel.create({
      filename:req.file.filename,
      originalName:req.file.originalname,
      image: file,
      uploadedBy: userId, 
    });

   

    res.status(200).json({
      status: true,
      fileupload,
    });

  } catch (error) {
    console.log(error, "file uploader error");
    return res.status(500).json({
      message: "File uploading error",
      error: error.message || error,
      status: false,
    });
  }
};

// download file form authenticated



export const downloadfile = async (req, res) => {
  try {
    const file = await fileModel.findById(req.params.id);
    if (!file) {
      return res.status(400).json({
        message: "File not found"
      });
    }

    file.downloads++;
    await file.save();

    const filePath = path.resolve(file.image); // Full path to the file from DB
    const originalName = file.originalName || "downloaded-file"; // fallback if originalName is missing

    res.download(filePath, originalName, (error) => {
      if (error) {
        return res.status(500).json({
          message: "There was an issue in downloading the file.",
          error: error.message,
        });
      }
    });

  } catch (error) {
    console.log(error, "download error");
    return res.status(500).json({
      message: "Download file error",
      status: false,
      error: error.message || error
    });
  }
};

  // audit file controller
  export const auditController=async(req,res)=>{
    try{
     const {action,fileId}=req.body;
    //  const fileById= await fileModel.find()
     const userId=req.userId;
     const audit=await auditModel.create({
      action,user:userId,fileId
     })
     res.status(200).json({
      status:true,
      audit,
     })
    }catch(error){
      return res.status(400).json({
        message:"audit creation error",
        status:false,
        error:error
      })
    }
  }

  // auditByid

  export const getAuditById=async(req,res)=>{
    try{
 const audit=await auditModel.findById(req.params.id);
 if(!audit){
  return res.status(401).json({
    message:"audit not find"
  })
 }
 res.status(201).json({
  status:true,
  audit,message:"audit find successfully"
 })
    }catch(error){
      console.log(error,"audit error")
      return res.status(401).json({
        status:false,
        message:"get audit error",
        error:error
      })
    }
  }