import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Department",
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    genre:{
        type:String,
        enum:['Male','Female','Any'],
        required:true
    },
    phone:{
        type:Number,
    },
    role:{
        type:String,
        enum:['SuperAdmin','Manager','Employee'],
        required:true
    },
    salary:{
        type:Number,
        default:0
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Active','Ineactive'],
        default:"Active"
    }
},{timestamps:true})

const Users = mongoose.model('Users',employeeSchema)

export default Users;