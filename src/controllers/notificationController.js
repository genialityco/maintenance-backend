// controllers/notificationController.js
import notificationService from "../services/notificationService.js";
import sendResponse from "../utils/sendResponse.js";

const notificationController = {
  // Crear una nueva suscripción
  createSubscription: async (req, res) => {
    const { subscriptionData, userType, userId } = req.body;
    try {
      const subscription = await notificationService.createSubscription(
        subscriptionData,
        userType,
        userId
      );
      sendResponse(res, 201, subscription, "Suscripción creada exitosamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Enviar notificaciones a un usuario en específico
  notifyUser: async (req, res) => {
    const { userId, title, message } = req.body;
    try {
      const payload = { title, body: message };
      await notificationService.sendNotification(userId, payload);
      sendResponse(res, 200, null, "Notificación enviada correctamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Enviar notificaciones a un tipo específico de usuario
  notifyByUserType: async (req, res) => {
    const { userType, userId, title, message } = req.body;
    try {
      const payload = { title, body: message };
      const result = await notificationService.notifyByUserType(
        userType,
        userId,
        payload
      );
      sendResponse(res, 200, null, result.message);
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Verificar si una suscripción ya existe usando POST
  checkSubscriptionExists: async (req, res) => {
    const { endpoint } = req.query; 
    try {
      const exists = await notificationService.subscriptionExists(endpoint);
      sendResponse(
        res,
        200,
        { exists },
        "Verificación de suscripción completada"
      );
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },
};

export default notificationController;
