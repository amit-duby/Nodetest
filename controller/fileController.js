import fileModel from "../model/FileModel.js";

export const fileUploader = async (req, res) => {
  try {
    const { filename, originalName } = req.body;

    // ✅ Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
        status: false,
      });
    }

    const file = req.file.path;
    const user = req.user?._id; // Optional chaining in case `req.user` is undefined

    // ✅ Check if user is available
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized. User info not found.",
        status: false,
      });
    }

    const fileupload = await fileModel.create({
      filename,
      originalName,
      image: file,
      uploadedBy: user,
    });

    res.status(200).json({
      status: true,
      fileupload,
    });

  } catch (error) {
    return res.status(500).json({
      message: "File uploading error",
      error: error.message || error,
      status: false,
    });
  }
};

  