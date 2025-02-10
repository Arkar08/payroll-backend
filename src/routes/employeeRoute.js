import express from 'express'

const router = express.Router()

router.post("/",postUserController)


export default router;