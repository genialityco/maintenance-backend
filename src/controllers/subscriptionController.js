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

  getSubscriptionByEndpoint: async (req, res) => {
    const { endpoint } = req.body;
    try {
      const subscription = await subscriptionService.getSubscriptionByEndpoint(
        endpoint
      );

      if (!subscription) {
        return sendResponse(
          res,
          404,
          null,
          "No se encontró ninguna suscripción con el endpoint proporcionado."
        );
      }
      sendResponse(
        res,
        200,
        subscription,
        "Suscripción existente con el endpoint."
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error al obtener la suscripción: " + error.message
      );
    }
  },

  // Eliminar una suscripción
  deleteSubscription: async (req, res) => {
    const { endpoint, userId } = req.body;
    try {
      const deletedSubscription = await subscriptionService.deleteSubscription(
        endpoint,
        userId
      );

      if (!deletedSubscription) {
        return sendResponse(
          res,
          404,
          null,
          "No se encontró ninguna suscripción para eliminar."
        );
      }

      sendResponse(
        res,
        200,
        deletedSubscription,
        "Suscripción eliminada con éxito"
      );
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },
};

export default subscriptionController;
