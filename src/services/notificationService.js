import webPush from "web-push";
import Subscription from "../models/subscriptionModel.js";

webPush.setVapidDetails(
  "mailto:lassojuanfe@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const notificationService = {
  // Crear una nueva suscripción
  createSubscription: async (subscriptionData, userType, userId) => {
    const newSubscription = new Subscription({
      ...subscriptionData,
      userType,
      userId,
    });
    return await newSubscription.save();
  },

  // Verificar si una suscripción ya existe por endpoint
  subscriptionExists: async (endpoint) => {
    return await Subscription.exists({ endpoint });
  },

  // Obtener suscripciones por tipo de usuario e ID
  getSubscriptionsByUser: async (userId) => {
    return await Subscription.find({ userId });
  },

  // Enviar notificación push a una suscripción específica
  sendNotification: async (userId, payload) => {
    try {
      const supscriptionData = await notificationService.getSubscriptionsByUser(
        userId
      );
      const supscription = {
        endpoint: supscriptionData[0].endpoint,
        keys: {
          auth: supscriptionData[0].keys.auth,
          p256dh: supscriptionData[0].keys.p256dh,
        },
      }
      await webPush.sendNotification(supscription, JSON.stringify(payload));
      console.log("Notificación enviada correctamente");
    } catch (error) {
      console.error("Error al enviar notificación:", error);
    }
  },

  // Enviar notificación a todas las suscripciones de un tipo de usuario específico
  notifyByUserType: async (userType, userId, payload) => {
    const subscriptions = await notificationService.getSubscriptionsByUser(
      userType,
      userId
    );
    for (const subscription of subscriptions) {
      await notificationService.sendNotification(subscription, payload);
    }
    return { message: "Notificaciones enviadas a los usuarios especificados" };
  },
};

export default notificationService;
