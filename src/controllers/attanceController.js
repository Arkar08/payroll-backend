import Attance from '../models/attanceSchema.js'
import Users from '../models/employeeSchema.js';


export const postAttanceController = async(req,res)=>{
    const {employeeId,checkIn} = req.body;
    if(!employeeId){
        const data = {
            status:404,
            isSuccess:false,
            message:"Plz Filled out in the form field."
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
        const checkIn =`${new Date().getHours()}:${new Date().getMinutes()}` 
        const postData = await Attance.create({
            employeeId:employeeId,
            checkIn:checkIn,
        })
        if(postData){
            const data = {
                status:201,
                isSuccess:true,
                maiinData:postData
            }
            return res.status(data.status).json(data) 
        }
    } catch (error) {
        console.log(error,'post Attance')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getAttanceController = async(req,res)=>{
    try {
        const findAttance = await Attance.find({})
        if(findAttance.length < 0){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data) 
        }
        if(findAttance.length > 0){
            const data = {
                status:200,
                isSuccess:true,
                length:findAttance.length,
                mainData:findAttance
            }
            return res.status(data.status).json(data)
        }
    } catch (error) {
        console.log(error,'get attance')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getAttanceIdController = async(req,res) =>{
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
        const findAttance = await Attance.findById({_id:id})
        if(!findAttance){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findAttance){
            const data = {
                status:200,
                isSuccess:true,
                mainData:findAttance
            }
            return res.status(data.status).json(data) 
        }
    } catch (error) {
        console.log(error,'get attance id')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const patchAttanceController = async(req,res)=>{
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
        const findAttance = await Attance.findById({_id:id})
        if(!findAttance){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findAttance){
            const getMinutes = new Date().getMinutes() < 10 ? '0'+ new Date().getMinutes() : new Date().getMinutes()
            const getHours = new Date().getHours() < 10 ? '0'+ new Date().getHours(): new Date().getHours()
            const checkOut = `${getHours}:${getMinutes}`
            const totalTime = new Date() - findAttance.createdAt
            const hours = Math.floor(totalTime /(1000 *3600) )
            const remainingSeconds = totalTime %(1000 * 3600);
            const minutes = Math.floor(remainingSeconds / (1000 *60));
            const data =hours< 10 ? '0' + hours : hours
            const minutesData = minutes< 10 ? '0'+ minutes:minutes
            const total = `${data}:${minutesData}`
            const updateData = await Attance.findOneAndUpdate({_id:id},{checkOut:checkOut})
            const updateTime = await Attance.findOneAndUpdate({_id:id},{totalTime:total})
            if(updateData && updateTime){
                const findAttanceId = await Attance.findById({_id:id})
                const postData = findAttanceId.toObject()
                delete postData.createdAt;
                delete postData.__v;
                delete postData.updatedAt
                const data = {
                    status:200,
                    isSuccess:true,
                    mainData:postData
                }
                return res.status(data.status).json(data) 
            }
        }
    } catch (error) {
        console.log(error,'patch attance id')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const deleteAttanceController = async(req,res)=>{
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
        const findAttance = await Attance.findById({_id:id})
        if(!findAttance){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findAttance){
            const deleteUser = await Attance.findByIdAndDelete({_id:id})
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
        console.log(error,'delete attance id')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}