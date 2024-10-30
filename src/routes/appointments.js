import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  getAppointmentsByEmployee,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Rutas CRUD para citas
router.post("/appointment", createAppointment);
router.get("/appointment", getAppointments);
router.get("/appointment/:id", getAppointmentById);
router.get("/appointment/employee/:employeeId", getAppointmentsByEmployee);
router.put("/appointment/:id", updateAppointment);
router.delete("/appointment/:id", deleteAppointment);

export default router;