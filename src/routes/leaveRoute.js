import express from 'express'
import { deleteLeaveController, getLeaveController, getLeaveIdController, patchLeaveIdController, postLeaveController } from '../controllers/leaveController.js';

const router = express.Router()

router.post("/",postLeaveController)
router.get("/",getLeaveController)
router.get("/:id",getLeaveIdController)
router.patch("/:id",patchLeaveIdController)
router.delete("/:id",deleteLeaveController)

export default router;