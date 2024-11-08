import express from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  getClientByPhoneNumber,
  registerReferral,
  registerService,
} from "../controllers/clientController.js";

const router = express.Router();

// Rutas CRUD para clientes
router.post("/client", createClient);
router.get("/client", getClients);
router.get("/client/:id", getClientById);
router.put("/client/:id", updateClient);
router.delete("/client/:id", deleteClient);

router.get("/client/phone/:phoneNumber", getClientByPhoneNumber);

// Rutas para registrar servicios y referidos
router.post("/client/service/:id", registerService);
router.post("/client/referral/:id", registerReferral);

export default router;
