import express from 'express';
import dotenv from 'dotenv'
import { connectToDb } from '../src/db/connectToDb.js';
import userRoute from '../src/routes/employeeRoute.js';
import authRoute from '../src/routes/authRoute.js';

dotenv.config();

export const app = express()
app.use(express.json())
app.use(express.static())

const PORT = process.env.PORT || 8000;


app.get("/",(req,res)=>{
    return res.status(200).json("Hello World")
})

//routes
app.use("/api/v1/users",userRoute)
app.use("/api/v1/auth",authRoute)

app.listen(PORT,async()=>{
    await connectToDb()
    console.log(`server is running.${PORT}`)
})

export default app;