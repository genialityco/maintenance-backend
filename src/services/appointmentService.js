import appointmentModel from "../models/appointmentModel.js";

// Crear una nueva cita
export const createAppointment = async (appointmentData) => {
  const { service, employee, user, startDate, endDate } = appointmentData;

  // Comprobar citas superpuestas
  const overlappingAppointments = await appointmentModel.find({
    employee,
    $or: [
      { startDate: { $lt: endDate, $gte: startDate } },
      { endDate: { $gt: startDate, $lte: endDate } },
      { startDate: { $lte: startDate }, endDate: { $gte: endDate } },
    ],
  });

  if (overlappingAppointments.length > 0) {
    throw new Error("El empleado tiene citas que se cruzan");
  }

  const newAppointment = new appointmentModel({
    service,
    employee,
    user,
    startDate,
    endDate,
  });

  return await newAppointment.save();
};
// Obtener todas las citas
export const getAppointments = async () => {
  return await appointmentModel
    .find()
    .populate("service")
    .populate("employee")
    .populate("user")
    .exec();
};

// Obtener una cita por ID
export const getAppointmentById = async (id) => {
  const appointment = await appointmentModel.findById(id);
  if (!appointment) {
    throw new Error("Cita no encontrada");
  }
  return appointment;
};

// Obtener las citas de un empleado
export const getAppointmentsByEmployee = async (employeeId) => {
  return await appointmentModel.find({ employee: employeeId }).populate("service").populate("user").exec();
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
