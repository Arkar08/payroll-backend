import express from 'express'
import { postUserController } from '../controllers/userController.js';

const router = express.Router()

router.post("/",postUserController)


export default router;