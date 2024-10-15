import appointmentModel from "../models/appointmentModel.js";

// Crear una nueva cita
export const createAppointment = async (appointmentData) => {
  const { service, startDate, endDate } = appointmentData;

  const newAppointment = new appointmentModel({
    service,
    startDate,
    endDate,
  });

  return await newAppointment.save();
};

// Obtener todas las citas
export const getAppointments = async () => {
  return await appointmentModel.find();
};

// Obtener una cita por ID
export const getAppointmentById = async (id) => {
  const appointment = await appointmentModel.findById(id);
  if (!appointment) {
    throw new Error("Cita no encontrada");
  }
  return appointment;
};

// Actualizar una cita
export const updateAppointment = async (id, updatedData) => {
  const appointment = await appointmentModel.findById(id);

  if (!appointment) {
    throw new Error("Cita no encontrada");
  }

  appointment.set(updatedData);
  return await appointment.save();
};

// Eliminar una cita
export const deleteAppointment = async (id) => {
  const appointment = await appointmentModel.findById(id);
  if (!appointment) {
    throw new Error("Cita no encontrada");
  }

  await appointment.deleteOne();
  return { message: "Cita eliminada correctamente" };
};
