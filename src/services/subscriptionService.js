import Subscription from "../models/subscriptionModel";

const subscriptionService = {
  // Guardar una suscripción
  saveSubscription: async (subscriptionData) => {
    const { endpoint, keys, userId } = subscriptionData;
    const newSubscription = new Subscription({
      endpoint,
      keys,
      userId,
    });
    return await newSubscription.save();
  },

  // Obtener todas las suscripciones
  getAllSubscriptions: async () => {
    return await Subscription.find();
  },

  // Obtener suscripciones por `userId`
  getSubscriptionsByUserId: async (userId) => {
    return await Subscription.find({ userId });
  },
};

export default subscriptionService;
