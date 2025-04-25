import mongoose from "mongoose";


const DbConnect=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/Node_Test');
    }catch(error){
        console.log(error,"mongodb connection error")
    }
    
}

export default DbConnect;