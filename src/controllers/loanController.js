import Users from "../models/employeeSchema.js";
import Loan from "../models/loanSchema.js";

export const postLoanController = async(req,res)=>{
    const {employeeId,loanType,amount,description} = req.body;
    if(!employeeId || !loanType || !amount || !description){
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
        const findLoan = await Loan.findOne({employeeId:employeeId})
        if(findLoan){
            const data = {
                status:400,
                isSuccess:false,
                message:"Loan is already exist."
            }
            return res.status(data.status).json(data)  
        }
        const newLoan =  await Loan.create({
            employeeId:employeeId,
            loanType:loanType,
            description:description,
            amount:amount
        })
        if(newLoan){
            const data = {
                status:201,
                isSuccess:true,
                maiinData:newLoan
            }
            return res.status(data.status).json(data) 
        }
    } catch (error) {
        console.log(error,'post loan')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getLoanController = async(req,res)=>{
    try {
        const findLoan = await Loan.find({})
        if(findLoan.length > 0){
            const data = {
                status:201,
                isSuccess:true,
                length:findLoan.length,
                maiinData:findLoan
            }
            return res.status(data.status).json(data) 
        }
        if(findLoan.length <= 0){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data not found."
            }
            return res.status(data.status).json(data)  
        }
    } catch (error) {
        console.log(error,'get loan')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getLoanIdController = async(req,res) =>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"loanId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findLoan = await Loan.findById({_id:id})
        if(!findLoan){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findLoan){
            const data = {
                status:200,
                isSuccess:true,
                mainData:findLoan
            }
            return res.status(data.status).json(data) 
        }
    } catch (error) {
        console.log(error,'get loan id')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const patchLoanController = async(req,res)=>{
    const {status} = req.body;
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
        const findLoan = await Loan.findById({_id:id})
        if(!findLoan){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findLoan){
            const updateData = await Loan.findOneAndUpdate({_id:id},{status:status})
            if(updateData){
                const findLoanId = await Loan.find({_id:id})
                if(findLoanId){
                    const data = {
                        status:200,
                        isSuccess:true,
                        mainData:findLoanId
                    }
                    return res.status(data.status).json(data) 
                }
            }
        }
    } catch (error) {
        console.log(error,'patch laon id')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const deleteLoanController = async(req,res)=>{
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
        const findLoan = await Loan.findById({_id:id})
        if(!findLoan){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findLoan){
            const deleteUser = await Loan.findByIdAndDelete({_id:id})
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
        console.log(error,'delete loan id')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}
