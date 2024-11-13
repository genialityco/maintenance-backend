import subscriptionService from "../services/subscriptionService.js";
import webPush from "web-push";
import sendResponse from "../utils/sendResponse.js";

// Configuración de VAPID
webPush.setVapidDetails(
  "mailto:lassojuanfe@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const subscriptionController = {
  // Guardar una nueva suscripción
  saveSubscription: async (req, res) => {
    try {
      const newSubscription = await subscriptionService.saveSubscription(
        req.body
      );
      sendResponse(
        res,
        201,
        newSubscription,
        "Suscripción guardada exitosamente"
      );
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Enviar notificación a una suscripción específica
  sendNotificationToUser: async (req, res) => {
    // const { userId } = req.params;
    const { title, message, userId } = req.body;
    const payload = JSON.stringify({
      title: title || "Notificación de Galaxia Glamour",
      message: message || "Tienes una nueva actualización disponible.",
    });

    try {
      const subscriptions = await subscriptionService.getSubscriptionsByUserId(
        userId
      );
      if (!subscriptions.length) {
        throw new Error("No hay suscripciones para este usuario");
      }

      // Configuración de las opciones para `web-push`
      const options = {
        vapidDetails: {
          subject: "mailto:lassojuanfe@gmail.com",
          publicKey: process.env.VAPID_PUBLIC_KEY,
          privateKey: process.env.VAPID_PRIVATE_KEY,
        },
        TTL: 60 * 60, // Tiempo de vida de 1 hora
        urgency: "high", // Entrega de alta prioridad
        contentEncoding: "aes128gcm", // Codificación recomendada
      };

      subscriptions.forEach(async (subscription) => {
        try {
          await webPush.sendNotification(subscription, payload, options);
        } catch (error) {
          console.error("Error al enviar notificación:", error);
        }
      });

      sendResponse(res, 200, null, "Notificación enviada al usuario");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Enviar notificación a todas las suscripciones
  sendNotificationToAll: async (req, res) => {
    const { title, message } = req.body;
    const payload = JSON.stringify({
      title: title || "Notificación de Galaxia Glamour",
      message: message || "Tienes una nueva actualización disponible.",
    });

    try {
      const subscriptions = await subscriptionService.getAllSubscriptions();
      if (!subscriptions.length) {
        throw new Error("No hay suscripciones registradas");
      }

      // Configuración de las opciones para `web-push`
      const options = {
        vapidDetails: {
          subject: "mailto:lassojuanfe@gmail.com",
          publicKey: process.env.VAPID_PUBLIC_KEY,
          privateKey: process.env.VAPID_PRIVATE_KEY,
        },
        TTL: 60 * 60, // Tiempo de vida de 1 hora
        urgency: "high", // Entrega de alta prioridad
        contentEncoding: "aes128gcm", // Codificación recomendada
      };

      subscriptions.forEach(async (subscription) => {
        try {
          await webPush.sendNotification(subscription, payload, options);
        } catch (error) {
          console.error("Error al enviar notificación:", error);
        }
      });

      sendResponse(
        res,
        200,
        null,
        "Notificaciones enviadas a todos los usuarios"
      );
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },
};

export default subscriptionController;
