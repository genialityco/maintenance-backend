import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

// Ruta para crear un nuevo servicio
router.post("/employees", createEmployee);

// Ruta para obtener todos los servicios
router.get("/employees", getEmployees);

// Ruta para obtener un servicio por ID
router.get("/employees/:id", getEmployeeById);

// Ruta para actualizar un servicio por ID
router.put("/employees/:id", updateEmployee);

// Ruta para eliminar un servicio por ID
router.delete("/employees/:id", deleteEmployee);

export default router;
