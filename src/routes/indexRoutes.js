import { Router } from "express";
import userRoutes from "./users"
import appointmentRoutes from "./appointments"

const router = Router();

router.use(userRoutes);
router.use(appointmentRoutes);

export default router;
