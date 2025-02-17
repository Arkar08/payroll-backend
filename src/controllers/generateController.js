import Users from "../models/employeeSchema.js";
import Department from "../models/departmentSchema.js";
import Attance from "../models/attanceSchema.js";
import Leave from '../models/leaveSchema.js';

export const getGenerateController = async(req,res)=>{
    const {employeeId} = req.body;
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
        const findDepartment = await Department.findById({_id:findUser.departmentId})
        const dateFormat = new Date()
        const lastFormat = new Date(dateFormat.getTime() - 30* 24 * 60 * 60 * 1000)
        const findDate = await Attance.find({$and:[{
            createdAt:{
                $gte:lastFormat,
                $lte:dateFormat
               
            }
        },{employeeId:employeeId}]})

        const findLeave = await Leave.find({$and:[{ createdAt:{
            $gte:lastFormat,
            $lte:dateFormat
           
        }},{employeeId:employeeId},{status:"Approve"}]})
        const postData ={
            fullName:findUser.fullName,
            department:findDepartment.name,
            attance:findDate.length,
            leave:findLeave.lengths,
        }
        if(postData){
            const data = {
                status:201,
                isSuccess:true,
                maiinData:postData
            }
            return res.status(data.status).json(data) 
        }
    } catch (error) {
        console.log(error,'get generate')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}