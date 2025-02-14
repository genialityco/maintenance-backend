
const cronController = {
  runDailyReminder: async (req, res) => {
    try {
      // Llama al servicio de recordatorios
      // await appointmentService.sendDailyReminders();
      res.status(200).json({ message: "Recordatorios enviados correctamente" });
    } catch (error) {
      console.error("Error al ejecutar el recordatorio:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};

export default cronController;
