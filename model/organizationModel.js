import mongoose from "mongoose";

const OrganizationSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"organization name is required"]
    },
    description:{
        type:String,
        default:''
    },
    // logo:{
    //     type:String,
    //     default:"",
    // }
},{timestamps:true});

const organizationModel=mongoose.model("organization",OrganizationSchema);
export default organizationModel;