import express from 'express'
import { getGenerateController } from '../controllers/generateController.js';

const router = express.Router()

router.post("/",getGenerateController)


export default router;