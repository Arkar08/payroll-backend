import mongoose from "mongoose";

const attanceSchema = new mongoose.Schema({
    checkIn:{
        type:String
    },
    checkOut:{
        type:String
    },
    date:{
        type:Date,
        default:new Date()
    },
    totalTime:{
        type:String,
    },
    status:{
        type:String,
        default:"Present",
        enum:['Present','Absent','Leave']
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        required:true
    }
},{timestamps:true})

const Attance = mongoose.model("Attance",attanceSchema)

export default Attance;