import { Router } from "express";
import userRoutes from "./users"
import appointmentRoutes from "./appointments"
import serviceRoutes from "./services"
import imagesRoutes from "./images"
import employeeRoutes from "./employee"

const router = Router();

router.use(userRoutes);
router.use(appointmentRoutes);
router.use(serviceRoutes);
router.use(imagesRoutes);
router.use(employeeRoutes);

export default router;
