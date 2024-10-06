import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Rutas CRUD para citas
router.post("/appointment", createAppointment);
router.get("/appointment", getAppointments);
router.get("/appointment/:id", getAppointmentById);
router.put("/appointment/:id", updateAppointment);
router.delete("/appointment/:id", deleteAppointment);

export default router;