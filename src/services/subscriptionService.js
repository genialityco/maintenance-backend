import Subscription from "../models/subscriptionModel";
import webPush from "web-push";

// Configuración de VAPID
webPush.setVapidDetails(
  "mailto:lassojuanfe@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const subscriptionService = {
  // Guardar una suscripción
  saveSubscription: async (subscriptionData) => {
    const { endpoint, keys, userId } = subscriptionData;

    // Verificar si ya existe el endpoint
    const existingEndpoint = await Subscription.findOne({ endpoint });
    if (existingEndpoint) {
      throw new Error("El endpoint ya está registrado");
    }

    // Crear una nueva suscripción si no existe
    const newSubscription = new Subscription({
      endpoint,
      keys,
      userId,
    });

    return await newSubscription.save();
  },

  // Obtener una suscripción por endpoint

  getSubscriptionByEndpoint: async (endpoint) => {
    return await Subscription.findOne({endpoint});
  },

  // Obtener todas las suscripciones
  getAllSubscriptions: async () => {
    return await Subscription.find();
  },

  // Obtener suscripciones por `userId`
  getSubscriptionsByUserId: async (userId) => {
    return await Subscription.find({ userId });
  },

  // Enviar notificación a una suscripción específica
  sendNotification: async (subscription, payload) => {
    const options = {
      vapidDetails: {
        subject: "mailto:lassojuanfe@gmail.com",
        publicKey: process.env.VAPID_PUBLIC_KEY,
        privateKey: process.env.VAPID_PRIVATE_KEY,
      },
      TTL: 60 * 60,
      urgency: "high",
      contentEncoding: "aes128gcm",
    };

    try {
      await webPush.sendNotification(subscription, payload, options);
    } catch (error) {
      console.error("Error al enviar notificación:", error);
    }
  },

  // Enviar notificación a un usuario específico por `userId`
  sendNotificationToUser: async (userId, payload) => {
    const subscriptions = await subscriptionService.getSubscriptionsByUserId(
      userId
    );

    subscriptions.forEach(async (subscription) => {
      await subscriptionService.sendNotification(subscription, payload);
    });
  },

  // Enviar notificación a todos los usuarios
  sendNotificationToAll: async (payload) => {
    const subscriptions = await subscriptionService.getAllSubscriptions();

    if (!subscriptions.length) {
      throw new Error("No hay suscripciones registradas");
    }

    subscriptions.forEach(async (subscription) => {
      await subscriptionService.sendNotification(subscription, payload);
    });
  },
};

export default subscriptionService;
