import appointmentService from "../services/appointmentService.js";
import subscriptionService from "../services/subscriptionService.js";
import sendResponse from "../utils/sendResponse.js";

const appointmentController = {
  // Controlador para crear una nueva cita
  createAppointment: async (req, res) => {
    try {
      const newAppointment = await appointmentService.createAppointment(
        req.body
      );
      sendResponse(res, 201, newAppointment, "Cita creada exitosamente");
      const notify = {
        title: "Cita creada",
        message: "Se te ha asignado una nueva cita",
        userId: newAppointment.employee,
      };
      await subscriptionService.sendNotificationToUser(notify);
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para obtener todas las citas
  getAppointments: async (req, res) => {
    try {
      const appointments = await appointmentService.getAppointments();
      sendResponse(res, 200, appointments, "Citas obtenidas exitosamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para obtener citas por organizationId
  getAppointmentsByOrganizationId: async (req, res) => {
    const { organizationId } = req.params;
    try {
      const appointments =
        await appointmentService.getAppointmentsByOrganizationId(
          organizationId
        );
      sendResponse(
        res,
        200,
        appointments,
        "Citas de la organización obtenidas exitosamente"
      );
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para obtener una cita por ID
  getAppointmentById: async (req, res) => {
    const { id } = req.params;
    try {
      const appointment = await appointmentService.getAppointmentById(id);
      sendResponse(res, 200, appointment, "Cita encontrada");
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },

  // Controlador para obtener las citas de un empleado
  getAppointmentsByEmployee: async (req, res) => {
    const { employeeId } = req.params;
    try {
      const appointments = await appointmentService.getAppointmentsByEmployee(
        employeeId
      );
      sendResponse(
        res,
        200,
        appointments,
        "Citas del empleado obtenidas exitosamente"
      );
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para actualizar una cita
  updateAppointment: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAppointment = await appointmentService.updateAppointment(
        id,
        req.body
      );
      sendResponse(
        res,
        200,
        updatedAppointment,
        "Cita actualizada exitosamente"
      );
      await subscriptionService.sendNotificationToUser({
        title: "Cita actualizada",
        message: "Se ha actualizado una cita",
        userId: updatedAppointment.employee,
      });
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },

  // Controlador para eliminar una cita
  deleteAppointment: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await appointmentService.deleteAppointment(id);
      sendResponse(res, 200, null, result.message);
      await subscriptionService.sendNotificationToUser({
        title: "Cita eliminada",
        message: "Se ha eliminado una cita",
        userId: result.appointment.employee,
      });
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },
};

export default appointmentController;
