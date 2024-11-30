import Reservation from "../models/reservationModel.js";
import Client from "../models/clientModel.js";

const reservationService = {
  // Crear una nueva reserva
  createReservation: async (reservationData) => {
    const reservation = new Reservation(reservationData);
    return await reservation.save();
  },

  // Obtener todas las reservas de una organización
  getReservationsByOrganization: async (organizationId) => {
    return await Reservation.find({ organizationId }).populate(
      "service employee customer"
    );
  },

  // Obtener una reserva por ID
  getReservationById: async (id) => {
    return await Reservation.findById(id).populate("service employee customer");
  },

  // Actualizar una reserva
  updateReservation: async (id, updateData) => {
    return await Reservation.findByIdAndUpdate(id, updateData, { new: true });
  },

  // Eliminar una reserva
  deleteReservation: async (id) => {
    return await Reservation.findByIdAndDelete(id);
  },

  // Validar y crear cliente si no existe
  ensureClientExists: async ({ name, phoneNumber, email, organizationId }) => {
    const existingClient = await Client.find({ phoneNumber, organizationId });
    if (existingClient) {
      return existingClient;
    }
    const newClient = new Client({ name, phoneNumber, email, organizationId });
    return await newClient.save();
  },
};

export default reservationService;
