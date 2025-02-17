import Users from "../models/employeeSchema.js";
import Payroll from "../models/payrollSchema.js";

export const postPayrollController = async(req,res)=>{
    const {employeeId ,totalAmount,remark,bonus,attance,leave,loan} = req.body;
    if(!employeeId || !totalAmount || !remark){
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
        const newPayroll = await Payroll.create({
            employeeId:employeeId,
            leave:leave,
            attance:attance,
            bonus:bonus,
            totalAmount:totalAmount,
            loan:loan,
            remark:remark
        })
        if(newPayroll){
            const data = {
                status:201,
                isSuccess:true,
                maiinData:newPayroll
            }
            return res.status(data.status).json(data) 
        }
    } catch (error) {
        console.log(error,'post payroll')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getPayrollController = async(req,res)=>{
    try {
        const findPayroll = await Payroll.find({})
        if(findPayroll.length <= 0){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data) 
        }
        if(findPayroll.length > 0){
            const data = {
                status:200,
                isSuccess:true,
                length:findPayroll.length,
                mainData:findPayroll
            }
            return res.status(data.status).json(data)
        }
    } catch (error) {
        console.log(error,'get payroll')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getPayrollIdController = async(req,res)=>{
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
        const findPayroll = await Payroll.findById({_id:id})
        if(!findPayroll){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findPayroll){
            const data = {
                status:200,
                isSuccess:true,
                mainData:findPayroll
            }
            return res.status(data.status).json(data) 
        }
    } catch (error) {
        console.log(error,'get payroll id')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}
