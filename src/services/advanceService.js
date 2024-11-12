import advancesModel from "../models/advancesModel.js";

const advanceService = {
  // Crear un nuevo avance
  createAdvance: async (advanceData) => {
    const { employee, description, amount, date } = advanceData;

    const newAdvance = new advancesModel({
      employee,
      description,
      amount,
      date,
    });

    return await newAdvance.save();
  },

  // Obtener todos los avances
  getAdvances: async () => {
    return await advancesModel.find().populate("project").exec();
  },

  // Obtener un avance por ID
  getAdvanceById: async (id) => {
    const advance = await advancesModel.findById(id);
    if (!advance) {
      throw new Error("Avance no encontrado");
    }
    return advance;
  },

  // Obtener avances de un empleado
  getAdvancesByEmployee: async (employeeId) => {
    return await advancesModel
      .find({ employee: employeeId })
      .populate("employee")
      .exec();
  },

  // Actualizar un avance
  updateAdvance: async (id, updatedData) => {
    const advance = await advancesModel.findById(id);

    if (!advance) {
      throw new Error("Avance no encontrado");
    }

    advance.set(updatedData);
    return await advance.save();
  },

  // Eliminar un avance
  deleteAdvance: async (id) => {
    const advance = await advancesModel.findById(id);
    if (!advance) {
      throw new Error("Avance no encontrado");
    }

    return await advance.deleteOne();
  },
};

export default advanceService;
