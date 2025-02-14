import Leave from  '../models/leaveSchema.js'
import Users from "../models/employeeSchema.js";


export const postLeaveController = async(req,res)=>{
    const {employeeId,fromDate,toDate,releaseType,releaseDays} = req.body;
    if(!employeeId || !fromDate || !toDate || !releaseType){
        const data = {
            status:404,
            isSuccess:false,
            message:"Data Not Found."
        }
        return res.status(data.status).json(data)  
    }
    try {
            const findUser = await Users.findById({_id:employeeId})
            if(!findUser){
                const data = {
                    status:404,
                    isSuccess:false,
                    message:"User does not exist."
                }
                return res.status(data.status).json(data)  
            }

            const find = await Leave.find({$and:[{employeeId:employeeId},{fromDate:fromDate},{toDate:toDate}]})
            if(find.length > 0){
                const data = {
                    status:404,
                    isSuccess:false,
                    message:"data is already exist."
                }
                return res.status(data.status).json(data) 
            }
            if(find.length <= 0){
                const postLeave = await Leave.create({
                    employeeId:employeeId,
                    fromDate:fromDate,
                    toDate:toDate,
                    releaseType:releaseType,
                    releaseDays:releaseDays
                })
                if(postLeave){
                    const data = {
                        status:201,
                        isSuccess:true,
                        maiinData:postLeave
                    }
                    return res.status(data.status).json(data) 
                }
            }

            

    } catch (error) {
        console.log(error,'post leave')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getLeaveController = async(req,res)=>{
    try {
        const findLeave = await Leave.find({})
        if(findLeave.length < 0){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data) 
        }
        if(findLeave.length > 0){
            const data = {
                status:200,
                isSuccess:true,
                length:findLeave.length,
                mainData:findLeave
            }
            return res.status(data.status).json(data)
        }
    } catch (error) {
        console.log(error,'get leave')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getLeaveIdController = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"leaveId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findLeave = await Leave.findById({_id:id})
        if(!findLeave){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findLeave){
            const data = {
                status:200,
                isSuccess:true,
                mainData:findLeave
            }
            return res.status(data.status).json(data)
        }
    } catch (error) {
        console.log(error,'get leave Id')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const patchLeaveIdController = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"leaveId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findLeave = await Leave.findById({_id:id})
        if(!findLeave){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findLeave){
            const updateData = await Leave.findByIdAndUpdate({_id:id},{...req.body})
            if(updateData){
                const patchData = await Leave.findById({_id:id})
                const data = {
                    status:200,
                    isSuccess:true,
                    mainData:patchData
                }
                return res.status(data.status).json(data)
            }
        }
    } catch (error) {
        console.log(error,'patch leave Id')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const deleteLeaveController = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"leaveId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findLeave = await Leave.findById({_id:id})
        if(!findLeave){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findLeave){
            const deleteUser = await Leave.findByIdAndDelete({_id:id})
           if(deleteUser){
            const data = {
                status:200,
                isSuccess:true,
                message:"Delete successfully."
            }
            return res.status(data.status).json(data)
           }
        } 
    } catch (error) {
        console.log(error,'delete leave id')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}