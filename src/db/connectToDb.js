import mongoose from "mongoose"

export const connectToDb = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,  // 30 seconds
            socketTimeoutMS: 45000,           // 45 seconds
          }).then(()=>{
            console.log('db is connected')
        }).catch((error)=>{
            console.log('db is disconnected.',error)
        })
    } catch (error) {
        console.log('db is disconnected.')
    }
}