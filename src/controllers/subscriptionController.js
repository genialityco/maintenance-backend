import subscriptionService from "../services/subscriptionService.js";
import sendResponse from "../utils/sendResponse.js";

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
    const { title, message, userId } = req.body;
    const payload = JSON.stringify({
      title: title || "Notificación de Galaxia Glamour",
      message: message || "Tienes una nueva actualización disponible.",
    });

    try {
      await subscriptionService.sendNotificationToUser(userId, payload);
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
      await subscriptionService.sendNotificationToAll(payload);
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
