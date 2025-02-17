import express from 'express'
import { deleteLoanController, getLoanController, getLoanIdController, patchLoanController, postLoanController } from '../controllers/loanController.js';

const router = express.Router()

router.post("/",postLoanController)
router.get("/",getLoanController)
router.get("/:id",getLoanIdController)
router.patch("/:id",patchLoanController)
router.delete("/:id",deleteLoanController)

export default router;