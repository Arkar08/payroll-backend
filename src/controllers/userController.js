export const postUserController = async(req,res)=>{
    try {
        console.log('user post')
    } catch (error) {
        return res.status(500).json({message:error})
    }
}