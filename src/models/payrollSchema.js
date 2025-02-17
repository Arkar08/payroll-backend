import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        required:true
    },
    leave:{
        type:Number,
        default:0
    },
    attance:{
        type:Number,
        required:true,
        default:0
    },
    bonus:{
        type:Number,
        default:0
    },
    totalAmount:{
        type:Number,
        default:0
    },
    remark:{
        type:String,
        required:true
    }

},{timestamps:true})

const Payroll = mongoose.model("Payroll",payrollSchema)

export default Payroll;