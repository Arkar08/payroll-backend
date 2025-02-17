import express from 'express';
import dotenv from 'dotenv'
import { connectToDb } from './db/connectToDb.js';
import userRoute from './routes/employeeRoute.js';
import authRoute from './routes/authRoute.js';
import deptRoute from './routes/departmentRoute.js';
import leaveRoute from './routes/leaveRoute.js';
import attanceRoute from './routes/attanceRoute.js';
import loanRoute  from './routes/loanRoute.js';
import generateRoute from './routes/generateRoute.js';
import payrollRoute from './routes/payrollRoute.js';



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

app.listen(PORT,async()=>{
    await connectToDb()
    console.log(`server is running.${PORT}`)
})

export default app;