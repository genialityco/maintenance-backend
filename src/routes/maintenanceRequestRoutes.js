import express from "express";
import maintenanceRequestController from "../controllers/maintenanceRequestController.js";

const router = express.Router();

// Crear una nueva solicitud de mantenimiento
router.post("/maintenance-requests", maintenanceRequestController.createRequest);

// Obtener todas las solicitudes
router.get("/maintenance-requests", maintenanceRequestController.getAllRequests);

// Obtener una solicitud específica por ID
router.get("/maintenance-requests/:id", maintenanceRequestController.getRequestById);

// Actualizar el estado de una solicitud
router.put("/maintenance-requests/:id/status", maintenanceRequestController.updateRequestStatus);

// Asignar Employee
router.put("/maintenance-requests/:id/assign", maintenanceRequestController.assignEmployee); 

// Eliminar una solicitud específica por ID
router.delete("/maintenance-requests/:id", maintenanceRequestController.deleteRequest);

// Actualizar una solicitud
router.put("/maintenance-requests/:id", maintenanceRequestController.updateMaintenanceRequest);

export default router;
