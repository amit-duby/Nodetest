import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename:{
        type:String,
        default:""
    },
    originalName:{type:String,default:""},
    image: {type:String,default:""},
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    downloads: { type: Number, default: 0 }
  },
  {timestamps:true}
);

const fileModel= mongoose.model("file",fileSchema);
export default fileModel;