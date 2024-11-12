import express from "express";
import roleController from "../controllers/roleController.js";

const router = express.Router();

// Ruta para crear un nuevo rol
router.post("/roles", roleController.createRole);

// Ruta para obtener todos los roles
router.get("/roles", roleController.getAllRoles);

// Ruta para obtener un rol específico por ID
router.get("/roles/:roleId", roleController.getRoleById);

// Ruta para actualizar un rol específico por ID
router.put("/roles/:roleId", roleController.updateRole);

// Ruta para eliminar un rol específico por ID
router.delete("/roles/:roleId", roleController.deleteRole);

export default router;
