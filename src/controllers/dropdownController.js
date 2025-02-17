import Users from "../models/employeeSchema.js"

export const dropdownUser = async(req,res)=>{
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
            const mapData = findUser.map((user)=>{
               return {id:user._id,name:user.fullName}
            })
            const data = {
                status:200,
                isSuccess:true,
                length:mapData.length,
                mainData:mapData
            }
            return res.status(data.status).json(data)
        }
    } catch (error) {
        console.log(error,'get dropdwon id')
        const data = {
            isSuccess:false,
            status:500,
            message:'Something went Wrong'|| error
        }
        return res.status(data.status).json(data)
    }
}