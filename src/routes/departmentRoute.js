import express from 'express'
import { deleteDeptController, getDeptController, getDeptIdController, postDeptController,patchDeptController } from '../controllers/departmentController.js';

const router = express.Router()

router.post('/',postDeptController)
router.get("/",getDeptController)
router.get("/:id",getDeptIdController)
router.delete("/:id",deleteDeptController)
router.patch("/:id",patchDeptController)


export default router;