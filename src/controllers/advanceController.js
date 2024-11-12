import advanceService from "../services/advanceService.js";
import sendResponse from "../utils/sendResponse.js";

const advanceController = {
  // Controlador para crear un nuevo avance
  createAdvance: async (req, res) => {
    try {
      const newAdvance = await advanceService.createAdvance(req.body);
      sendResponse(res, 201, newAdvance, "Avance creado exitosamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para obtener todos los avances
  getAdvances: async (req, res) => {
    try {
      const advances = await advanceService.getAdvances();
      sendResponse(res, 200, advances, "Avances obtenidos exitosamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para obtener un avance por ID
  getAdvanceById: async (req, res) => {
    const { id } = req.params;
    try {
      const advance = await advanceService.getAdvanceById(id);
      sendResponse(res, 200, advance, "Avance encontrado");
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },

  // Controlador para obtener avances de un empleado
  getAdvancesByEmployee: async (req, res) => {
    const { employeeId } = req.params;
    try {
      const advances = await advanceService.getAdvancesByEmployee(employeeId);
      sendResponse(
        res,
        200,
        advances,
        "Avances del empleado obtenidos exitosamente"
      );
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para actualizar un avance
  updateAdvance: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAdvance = await advanceService.updateAdvance(id, req.body);
      sendResponse(res, 200, updatedAdvance, "Avance actualizado exitosamente");
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },

  // Controlador para eliminar un avance
  deleteAdvance: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await advanceService.deleteAdvance(id);
      sendResponse(res, 200, null, "Avance eliminado correctamente");
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },
};

export default advanceController;
