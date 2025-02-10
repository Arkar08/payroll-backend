import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        required:true
    },
    leaveId:{
        type:Number,
        default:0
    },
    loanId:{
        type:Number,
        default:0
    },
    attanceId:{
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