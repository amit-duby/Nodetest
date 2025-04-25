import mongoose from "mongoose";

const auditSchema=new mongoose.Schema({
    action:{
        type:String,
        default:"",
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    fileId:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }
},{
    timestamps:true,
})

const auditModel= mongoose.model('audit',auditSchema);
export default auditModel;