import express from "express";
import employeeController from "../controllers/employeeController.js";

const router = express.Router();

// Ruta para crear un empleado
router.post("/employees", employeeController.createEmployee);

// Ruta para obtener todos los empleados
router.get("/employees", employeeController.getEmployees);

// Obtener los empleados por organizationId
router.get(
  "/employees/organization/:organizationId",
  employeeController.getEmployeesByOrganizationId
);

// Ruta para obtener un empleado específico por ID
router.get("/employees/:id", employeeController.getEmployeeById);

// Ruta para obtener un empleado por número de teléfono
router.get(
  "/employees/phone/:phoneNumber",
  employeeController.getEmployeeByPhoneNumber
);

// Ruta para actualizar un empleado específico por ID
router.put("/employees/:id", employeeController.updateEmployee);

// Ruta para eliminar un empleado específico por ID
router.delete("/employees/:id", employeeController.deleteEmployee);

export default router;
