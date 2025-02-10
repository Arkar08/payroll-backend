export const loginController = async(req,res)=>{
    try {
        console.log('login')
    } catch (error) {
        return res.status(500).json({message:error})
    }
}