import mongoose from "mongoose"

export const connectToDb = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log('db is connected')
        }).catch((error)=>{
            console.log('db is disconnected.',error)
        })
    } catch (error) {
        console.log('db is disconnected.')
    }
}