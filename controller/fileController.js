import fileModel from "../model/FileModel.js";

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


  