import mongoose from "mongoose";


const loanSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    loanType:{
        type:String,
        enum:['Education','Buy Cars','Buy House'],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending",
        enum:['Pending','Approve','Reject']
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        required:true
    }
},{timestamps:true})

const Loan = mongoose.model("Loan",loanSchema)

export default Loan;