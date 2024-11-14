import whatsappService from "../services/sendWhatsappService";
import sendResponse from "../utils/sendResponse";

const whatsappController = {
  sendWhatsappReminder: async (req, res) => {
    const { phone, message, appointmentDetails } = req.body;
    try {
      const response = await whatsappService.sendWhatsappReminder(
        phone,
        message,
        appointmentDetails
      );
      sendResponse(res, 200, response, "Mensaje enviado correctamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },
};

export default whatsappController;
