import express from 'express'
import { dropdownUser } from '../controllers/dropdownController.js';


const router = express.Router()
router.get('/user',dropdownUser)


export default router;