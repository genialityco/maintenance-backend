import whatsappService from "../services/sendWhatsappService";
import sendResponse from "../utils/sendResponse";

const whatsappController = {
  sendWhatsappReminder: async (req, res) => {
    const { phone } = req.body;
    const appointmentDetails = {
      names: "Maria Paula",
      date: "17 de noviembre",
      organzation: "Galaxia Glamour",
      phoneNumber: "3218104634"
    }
    try {
      const response = await whatsappService.sendWhatsappReminder(
        phone,
        appointmentDetails
      );
      sendResponse(res, 200, response, "Mensaje enviado correctamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },
};

export default whatsappController;
