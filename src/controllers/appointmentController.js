import appointmentModel from "../models/appointmentModel";

// Crear una nueva cita
export const createAppointment = async (req, res) => {
  try {
    const { service, startDate, endDate } = req.body;

    // Crear la nueva cotización
    const newAppointment = new appointmentModel({
      service,
      startDate,
      endDate,
    });

    // Guardar la cotización en la base de datos
    await newAppointment.save();

    // Responder con la cotización creada
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las citas
export const getAppointments = async (req, res) => {
  try {
    const quotes = await appointmentModel.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una cita por ID
export const getAppointmentById = async (req, res) => {
  try {
    const quote = await appointmentModel.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una cita
export const updateAppointment = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;
    const quote = await appointmentModel.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    quote.name = name || quote.name;
    quote.email = email || quote.email;
    quote.phoneNumber = phoneNumber || quote.phoneNumber;
    quote.message = message || quote.message;

    await quote.save();
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una cita
export const deleteAppointment = async (req, res) => {
  try {
    const quote = await appointmentModel.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    await quote.delete();
    res.status(200).json({ message: "Cita eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
