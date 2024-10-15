import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

// Ruta para crear un nuevo servicio
router.post("/service", createService);

// Ruta para obtener todos los servicios
router.get("/service", getServices);

// Ruta para obtener un servicio por ID
router.get("/service/:id", getServiceById);

// Ruta para actualizar un servicio por ID
router.put("/service/:id", updateService);

// Ruta para eliminar un servicio por ID
router.delete("/service/:id", deleteService);

export default router;
