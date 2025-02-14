import Department from "../models/departmentSchema.js";


export const postDeptController = async(req,res)=>{
    const {name,salaryRate} = req.body;
    if(!name || !salaryRate){
        const data = {
            status:404,
            isSuccess:false,
            message:"Data Not Found."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findName = await Department.findOne({name:name})
        if(findName){
            const data = {
                status:404,
                isSuccess:false,
                message:"Name is already exist."
            }
            return res.status(data.status).json(data)
        }
        const newDept = await Department.create({
            name:name,
            salaryRate:salaryRate
        })
        if(newDept){
            const data = {
                status:201,
                isSuccess:true,
                mainData:newDept
            }
            return res.status(data.status).json(data)
        }
        if(!newDept){
            const data = {
                status:404,
                isSuccess:false,
                message:"Not-Found"
            }
            return res.status(data.status).json(data)
        } 
    } catch (error) {
        console.log(error,'post Dept')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getDeptController = async(req,res)=>{
    try {
        const getDept = await Department.find({})
        if(getDept.length <= 0){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        
        if(getDept.length > 0){
            const data = {
                status:200,
                isSuccess:true,
                length:getDept.length,
                mainData:getDept
            }
            return res.status(data.status).json(data)
        }
    } catch (error) {
        console.log(error,'get Dept')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}

export const getDeptIdController = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"departmentId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findDept = await Department.findById({_id:id})
        if(!findDept){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findDept){
            const data = {
                status:200,
                isSuccess:true,
                mainData:findDept
            }
            return res.status(data.status).json(data)
        }
    } catch (error) {
        console.log(error,'get Dept id')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}

export const patchDeptController = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"departmentId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findDept = await Department.findById({_id:id})
        if(!findDept){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findDept){
            const updateData = await Department.findByIdAndUpdate({_id:id},{...req.body})
            if(updateData){
                const patchData = await Department.findById({_id:id})
                const data = {
                    status:200,
                    isSuccess:true,
                    mainData:patchData
                }
                return res.status(data.status).json(data)
            }
        }
    } catch (error) {
        console.log(error,'patch Dept id')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}

export const deleteDeptController = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"departmentId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findDept = await Department.findById({_id:id})
        if(!findDept){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findDept){
            const deleteDept = await Department.findByIdAndDelete({_id:id})
           if(deleteDept){
            const data = {
                status:200,
                isSuccess:true,
                message:"Delete successfully."
            }
            return res.status(data.status).json(data)
           }
        } 
    } catch (error) {
        console.log(error,'delete Dept id')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}