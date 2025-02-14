import express from 'express'
import { deleteAttanceController, getAttanceController, getAttanceIdController, patchAttanceController, postAttanceController } from '../controllers/attanceController.js';

const router = express.Router()

router.post("/",postAttanceController)
router.get("/",getAttanceController)
router.get("/:id",getAttanceIdController)
router.patch("/:id",patchAttanceController)
router.delete("/:id",deleteAttanceController)

export default router;