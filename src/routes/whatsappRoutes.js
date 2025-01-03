import express from "express";
import whatsappController from "../controllers/whatsappController.js";

const router = express.Router();

// Ruta para enviar un mensaje de recordatorio por WhatsApp
router.post("/whatsapp/reminder", whatsappController.sendWhatsappReminder);
router.post("/webhook/whatsapp", async (req, res) => {
    const { Body, From } = req.body; // Mensaje recibido y número del remitente
  
    console.log(`Mensaje recibido de ${From}: ${Body}`);
  
    // Lógica para ignorar o responder
    try {
      // Responder automáticamente si es necesario
      const responseMessage = "Este número no responde mensajes, por favor comunicate al número indicado anteriormente.";
  
      // Puedes usar Twilio para responder directamente
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);
  
      await client.messages.create({
        body: responseMessage,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: From,
      });
  
      res.status(200).send("Mensaje procesado");
    } catch (error) {
      console.error("Error procesando el mensaje:", error.message);
      res.status(500).send("Error procesando el mensaje");
    }
  });

export default router;
