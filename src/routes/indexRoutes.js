import { Router } from "express";
import clientRoutes from "./client"
import appointmentRoutes from "./appointments"
import serviceRoutes from "./services"
import imagesRoutes from "./images"
import employeeRoutes from "./employee"
import advanceRoutes from "./advance"

const router = Router();

router.use(clientRoutes);
router.use(appointmentRoutes);
router.use(serviceRoutes);
router.use(imagesRoutes);
router.use(employeeRoutes);
router.use(advanceRoutes);

export default router;
