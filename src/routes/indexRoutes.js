import { Router } from "express";
import clientRoutes from "./client"
import appointmentRoutes from "./appointments"
import serviceRoutes from "./services"
import imagesRoutes from "./images"
import employeeRoutes from "./employee"
import advanceRoutes from "./advance"
import roleRoutes from "./role"
import organizationRoutes from "./organizationRoutes"
import authRoutes from "./authRoutes"
import notificationRoutes from "./notificationRoutes"

const router = Router();

router.use(clientRoutes);
router.use(appointmentRoutes);
router.use(serviceRoutes);
router.use(imagesRoutes);
router.use(employeeRoutes);
router.use(advanceRoutes);
router.use(roleRoutes);
router.use(organizationRoutes);
router.use(authRoutes);
router.use(notificationRoutes);

export default router;
