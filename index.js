import express from 'express';
import dotenv from 'dotenv'
import { connectToDb } from './src/db/connectToDb.js';
import userRoute from './src/routes/employeeRoute.js';
import authRoute from './src/routes/authRoute.js';
import deptRoute from './src/routes/departmentRoute.js';
import leaveRoute from './src/routes/leaveRoute.js';
import attanceRoute from './src/routes/attanceRoute.js';
import loanRoute  from './src/routes/loanRoute.js';
import generateRoute from './src/routes/generateRoute.js';
import payrollRoute from './src/routes/payrollRoute.js';
import dropdownRoute from './src/routes/dropDownRoute.js';



dotenv.config();


export const app = express()


app.use(express.json())

const PORT = process.env.PORT || 8000;


app.get("/",(req,res)=>{
    return res.status(200).json("Hello World")
})

//routes
app.use("/api/v1/users",userRoute)
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/department",deptRoute)
app.use("/api/v1/leave",leaveRoute)
app.use("/api/v1/attance",attanceRoute)
app.use("/api/v1/loan",loanRoute)
app.use("/api/v1/generate",generateRoute)
app.use("/api/v1/payroll",payrollRoute)
app.use("/api/v1/dropdown",dropdownRoute)

app.listen(PORT,async()=>{
    await connectToDb()
    console.log(`server is running.${PORT}`)
})

export default app;