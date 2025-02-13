export const postUserController = async(req,res)=>{
    try {
        return res.status(200).json("hello")
    } catch (error) {
        return res.status(500).json({message:error})
    }
}