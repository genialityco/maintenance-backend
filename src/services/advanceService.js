import advancesModel from "../models/advancesModel";

// Crear un nuevo avance
export const createAdvance = async (advanceData) => {
  const { employee, description, amount, date } = advanceData;

  const newAdvance = new advancesModel({
    employee,
    description,
    amount,
    date,
  });

  return await newAdvance.save();
};

// Obtener todos los avances
export const getAdvances = async () => {
  return await advancesModel.find().populate("project").exec();
};

// Obtener un avance por ID
export const getAdvanceById = async (id) => {
  const advance = await advancesModel.findById(id);
  if (!advance) {
    throw new Error("Avance no encontrado");
  }
  return advance;
};

// Obtener avances de un empleado
export const getAdvancesByEmployee = async (employeeId) => {
  return await advancesModel
    .find({ employee: employeeId })
    .populate("employee")
    .exec();
};

// Actualizar un avance
export const updateAdvance = async (id, updatedData) => {
  const advance = await advancesModel.findById(id);

  if (!advance) {
    throw new Error("Avance no encontrado");
  }

  advance.set(updatedData);
  return await advance.save();
};

// Eliminar un avance
export const deleteAdvance = async (id) => {
  const advance = await advancesModel.findById(id);
  if (!advance) {
    throw new Error("Avance no encontrado");
  }

  return await advance.deleteOne();
};
