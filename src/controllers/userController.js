import Department from "../models/departmentSchema.js";
import Users from "../models/employeeSchema.js";


export const postUserController = async(req,res)=>{
    const {fullName,departmentId,email,password,age,genre,phone,role,salary,address} = req.body;
    if(!fullName || !departmentId || !email || !password || !age || !genre || !phone || !role || !salary || !address){
        const data = {
            status:404,
            isSuccess:false,
            message:"Plz Filled out in the form field."
        }
        return res.status(data.status).json(data) 
    }
    try {
        const findName = await Users.findOne({fullName:fullName})
        if(findName){
            const data = {
                status:404,
                isSuccess:false,
                message:"Name is already exist."
            }
            return res.status(data.status).json(data) 
        }
        const findEmail = await Users.findOne({email:email})
        if(findEmail){
            const data = {
                status:404,
                isSuccess:false,
                message:"Email is already exist."
            }
            return res.status(data.status).json(data) 
        }

        if(password.length < 6){
            const data = {
                status:404,
                isSuccess:false,
                message:'password is minLength 6'
            }
            return res.status(data.status).json(data) 
        }

        const findDepartment = await Department.findById({_id:departmentId})
        if(findDepartment){
            const newUser = await Users.create({
                fullName:fullName,
                departmentId:departmentId,
                email:email,
                password:password,
                age:age,
                genre:genre,
                phone:phone,
                role:role,
                salary:salary,
                address:address
            })
            if(newUser){
                const data = {
                    status:201,
                    isSuccess:true,
                    maiinData:newUser
                }
                return res.status(data.status).json(data) 
            }
        }
        if(!findDepartment){
            const data = {
                status:404,
                isSuccess:false,
                message:"department does not exist."
            }
            return res.status(data.status).json(data) 
        }
    } catch (error) {
        console.log(error,'post user')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getUserController = async(req,res) =>{
    try {
        const findUser = await Users.find({})
        if(findUser.length <= 0){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data) 
        }
        if(findUser.length > 0){
            const data = {
                status:200,
                isSuccess:true,
                length:findUser.length,
                mainData:findUser
            }
            return res.status(data.status).json(data)
        }
    } catch (error) {
        console.log(error,'get user')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}

export const getUserIdController = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"userId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findUser = await Users.findById({_id:id})
        if(!findUser){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findUser){
            const data = {
                status:200,
                isSuccess:true,
                mainData:findUser
            }
            return res.status(data.status).json(data)
        }
    } catch (error) {
        console.log(error,'get user id')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}

export const patchUserController = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"userId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findUser = await Users.findById({_id:id})
        if(!findUser){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findUser){
            const updateData = await Users.findByIdAndUpdate({_id:id},{...req.body})
            const patchData = await Users.findById({_id:id})
            if(updateData){
                const data = {
                    status:200,
                    isSuccess:true,
                    mainData:patchData
                }
                return res.status(data.status).json(data)
            }
        }
    } catch (error) {
        console.log(error,'patch user id')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}

export const deleteUserController = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        const data = {
            status:404,
            isSuccess:false,
            message:"userId does not exist."
        }
        return res.status(data.status).json(data)
    }
    try {
        const findUser = await Users.findById({_id:id})
        if(!findUser){
            const data = {
                status:404,
                isSuccess:false,
                message:"Data Not Found."
            }
            return res.status(data.status).json(data)
        }
        if(findUser){
            const deleteUser = await Users.findByIdAndDelete({_id:id})
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
        console.log(error,'delete user id')
        const data = {
            status:500,
            isSuccess:false,
            message:'Something went Wrong' || error
        }
        return res.status(data.status).json(data)
    }
}