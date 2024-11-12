import appointmentModel from "../models/appointmentModel.js";

const appointmentService = {
  // Crear una nueva cita
  createAppointment: async (appointmentData) => {
    const { service, employee, client, startDate, endDate, organizationId } =
      appointmentData;

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
      client,
      startDate,
      endDate,
      organizationId,
    });

    return await newAppointment.save();
  },

  // Obtener todas las citas
  getAppointments: async () => {
    return await appointmentModel
      .find()
      .populate("service")
      .populate("employee")
      .populate("client")
      .exec();
  },

  // Obtener citas por organizationId
  getAppointmentsByOrganizationId: async (organizationId) => {
    return await appointmentModel
      .find({ organizationId })
      .populate("service")
      .populate("employee")
      .populate("client")
      .exec();
  },

  // Obtener una cita por ID
  getAppointmentById: async (id) => {
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      throw new Error("Cita no encontrada");
    }
    return appointment;
  },

  // Obtener las citas de un empleado
  getAppointmentsByEmployee: async (employeeId) => {
    return await appointmentModel
      .find({ employee: employeeId })
      .populate("service")
      .populate("client")
      .exec();
  },

  // Actualizar una cita
  updateAppointment: async (id, updatedData) => {
    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      throw new Error("Cita no encontrada");
    }

    appointment.set(updatedData);
    return await appointment.save();
  },

  // Eliminar una cita
  deleteAppointment: async (id) => {
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      throw new Error("Cita no encontrada");
    }

    await appointment.deleteOne();
    return { message: "Cita eliminada correctamente" };
  },
};

export default appointmentService;
