const whatsappService = {
  sendWhatsappReminder: async (phone, message, appointmentDetails) => {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);

      const messageBody = `${message} ${appointmentDetails}`;

      await client.messages.create({
        body: messageBody,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${phone}`,
      });

      return { message: "Mensaje enviado correctamente" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default whatsappService;
