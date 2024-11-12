import express from "express";
import organizationController from "../controllers/organizationController.js";

const router = express.Router();

// Ruta para crear una nueva organización
router.post("/organizations", organizationController.createOrganization);

// Ruta para obtener todas las organizaciones
router.get("/organizations", organizationController.getOrganizations);

// Ruta para obtener una organización específica por ID
router.get("/organizations/:id", organizationController.getOrganizationById);

// Ruta para actualizar una organización específica por ID
router.put("/organizations/:id", organizationController.updateOrganization);

// Ruta para eliminar una organización específica por ID
router.delete("/organizations/:id", organizationController.deleteOrganization);

export default router;
