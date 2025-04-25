import organizationModel from "../model/organizationModel.js"

export const organizController=async(req,res)=>{
    try{
const {name,description}=req.body;
  const organiz= await organizationModel({
    name,description
  })
  const organizSave=await organiz.save();
  res.status(200).json({
    status:true,
    organizSave,
    message:"organization created successfully",
  })
    }catch(error){
        return res.status(401).json({
            message:"organization not created",
            error:error,
            status:false
        })
    }
}

// get all organization 
export const getallOrganization=async(req,res)=>{
    try{
    const organiz = await organizationModel.find();
    res.status(200).json({
        status:true,
        organiz,
        message:' organiz find successfully',
    })
    }catch(error){
      return   res.status(401).josn({
            message:"user get error",
            status:false,
           error:error
        })
    }
 }


//  get single organize
export const getOrganizationById=async(req,res)=>{
    try{
    const organiz = await organizationModel.findById(req.params.id);
    if(!organiz){
        return res.status(400).josn({
            message:"organization id not find "
        })
    }
    res.status(200).json({
        status:true,
        organiz,
        message:' organiz find successfully',
    })
    }catch(error){
      return   res.status(401).josn({
            message:"user get error",
            status:false,
           error:error
        })
    }
 }


//  updateorganizationByid

export const updateOrganizationById=async(req,res)=>{
    try{
        const {name,description}=req.body;
    const organiz = await organizationModel.findById(req.params.id);
    if(!organiz){
        return res.status(400).josn({
            message:"organization id not find "
        })
    }

    const update= await organizationModel.findByIdAndUpdate(req.params.id,{
        name,description
    })
    res.status(200).json({
        status:true,
        update,
        message:' organiz updated successfully',
    })
    }catch(error){
      return   res.status(401).josn({
            message:"update organization error",
            status:false,
           error:error
        })
    }
 }

//  delete organization
export const deleteOrganizationById=async(req,res)=>{
    try{
   const organiz= await organizationModel.findByIdAndDelete(req.params.id);
   if(!organiz){
    return res.status(401).json({
        message:"organiz data not deleted by this id"
    })
   }
    }catch(error){
        return res.status(401).josn({
            message:"organization data not deleted",
            status:false,
            error:error
        })
    }
}