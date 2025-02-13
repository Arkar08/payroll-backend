import Department from "../models/departmentSchema.js";
import Users from "../models/employeeSchema.js";

export const postUserController = async(req,res)=>{
    const {fullName,departmentId,email,password,age,genre,phone,role,salary,address} = req.body;
    if(!fullName || !departmentId || !email || !password || !age || !genre || !phone || !role || !salary || !address){
        const data = {
            status:404,
            isSuccess:false,
            message:"Data Not Found."
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