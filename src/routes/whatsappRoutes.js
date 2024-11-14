import express from "express";
import whatsappController from "../controllers/whatsappController.js";

const router = express.Router();

// Ruta para enviar un mensaje de recordatorio por WhatsApp
router.post("/whatsapp/reminder", whatsappController.sendWhatsappReminder);

export default router;
