import { Router } from "express";
import serviceRoutes from "./services"
import imagesRoutes from "./images"
import employeeRoutes from "./employee"
import roleRoutes from "./role"
import organizationRoutes from "./organizationRoutes"
import authRoutes from "./authRoutes"
import subscriptionRoutes from "./subscriptionRoutes"
import whatsappRoutes from "./whatsappRoutes"
import cronRoutes from "./cronRoutes"
import notificationRoutes from "./notification"
import maintenanceRequestRoutes from "./maintenanceRequestRoutes"

const router = Router();

router.use(serviceRoutes);
router.use(imagesRoutes);
router.use(employeeRoutes);
router.use(roleRoutes);
router.use(organizationRoutes);
router.use(authRoutes);
router.use(subscriptionRoutes);
router.use(whatsappRoutes);
router.use(cronRoutes);
router.use(notificationRoutes);
router.use(maintenanceRequestRoutes);

export default router;
