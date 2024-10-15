import { Router } from "express";
import userRoutes from "./users"
import appointmentRoutes from "./appointments"
import serviceRoutes from "./services"
import imagesRoutes from "./images"

const router = Router();

router.use(userRoutes);
router.use(appointmentRoutes);
router.use(serviceRoutes);
router.use(imagesRoutes);

export default router;
