import express from 'express'
import { getPayrollController, getPayrollIdController, postPayrollController } from '../controllers/payrollController.js';

const router = express.Router()

router.post('/',postPayrollController)
router.get("/",getPayrollController)
router.get("/:id",getPayrollIdController)


export default router;