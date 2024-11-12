// routes/notificationRoutes.js
import express from "express";
import notificationController from "../controllers/notificationController.js";

const router = express.Router();

// Ruta para crear una nueva suscripción
router.post(
  "/notifications/subscribe",
  notificationController.createSubscription
);

// Ruta para enviar notificaciones a un usuario específico
router.post("/notifications/user", notificationController.notifyUser);

// Ruta para enviar notificaciones a un tipo de usuario
router.post("/notifications/notify", notificationController.notifyByUserType);

// Ruta para verificar si una suscripción ya existe
router.get(
  "/notifications/check",
  notificationController.checkSubscriptionExists
);

export default router;
