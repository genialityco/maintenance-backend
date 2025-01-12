import express from "express";
import subscriptionController from "../controllers/subscriptionController.js";

const router = express.Router();

// Ruta para obtener una suscripción por endpoint
router.get("/subscribe/endoint", subscriptionController.getSubscriptionByEndpoint);

// Ruta para guardar una suscripción
router.post("/subscribe", subscriptionController.saveSubscription);

// Ruta para enviar notificación a un usuario específico
router.post(
  "/notify/user/:userId",
  subscriptionController.sendNotificationToUser
);

// Ruta para enviar notificaciones a todos los usuarios
router.post("/notify/all", subscriptionController.sendNotificationToAll);

// Ruta para eliminar una supscripción
router.delete("/subscribe", subscriptionController.deleteSubscription);

export default router;
