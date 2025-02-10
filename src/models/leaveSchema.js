import mongoose from "mongoose";


const leaveSchema = new mongoose.Schema({
    fromDate:{
        type:String,
        required:true
    },
    toDate:{
        type:String,
        required:true
    },
    releaseType:{
        type:String,
        enums:['Full','Half']
    },
    releaseDays:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enums:['Pending','Approve','Reject']
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        required:true
    }
},{timestamps:true})

const Leave = mongoose.model('Leave',leaveSchema)

export default Leave;