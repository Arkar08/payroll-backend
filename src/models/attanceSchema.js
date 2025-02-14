import mongoose from "mongoose";

const attanceSchema = new mongoose.Schema({
    checkIn:{
        type:String
    },
    checkOut:{
        type:String
    },
    date:{
        type:String,
    },
    totalTime:{
        type:String,
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        required:true
    }
},{timestamps:true})

const Attance = mongoose.model("Attance",attanceSchema)

export default Attance;