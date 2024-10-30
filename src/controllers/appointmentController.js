import * as appointmentService from "../services/appointmentService.js";
import sendResponse from "../utils/sendResponse.js";

// Crear una nueva cita
export const createAppointment = async (req, res) => {
  try {
    const newAppointment = await appointmentService.createAppointment(req.body);
    sendResponse(res, 201, newAppointment, "Cita creada exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

// Obtener todas las citas
export const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointments();
    sendResponse(res, 200, appointments, "Citas obtenidas exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

// Obtener una cita por ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentService.getAppointmentById(
      req.params.id
    );
    sendResponse(res, 200, appointment, "Cita encontrada");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

export const getAppointmentsByEmployee = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointmentsByEmployee(
      req.params.employeeId
    );
    sendResponse(res, 200, appointments, "Citas obtenidas exitosamente");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

// Actualizar una cita
export const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await appointmentService.updateAppointment(
      req.params.id,
      req.body
    );
    sendResponse(res, 200, updatedAppointment, "Cita actualizada exitosamente");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

// Eliminar una cita
export const deleteAppointment = async (req, res) => {
  try {
    const result = await appointmentService.deleteAppointment(req.params.id);
    sendResponse(res, 200, null, result.message);
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};
