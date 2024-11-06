import * as advanceService from "../services/advanceService";
import sendResponse from "../utils/sendResponse";

// Crear un nuevo avance
export const createAdvance = async (req, res) => {
  try {
    const newAdvance = await advanceService.createAdvance(req.body);
    sendResponse(res, 201, newAdvance, "Avance creado exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

// Obtener todos los avances
export const getAdvances = async (req, res) => {
  try {
    const advances = await advanceService.getAdvances();
    sendResponse(res, 200, advances, "Avances obtenidos exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

// Obtener un avance por ID
export const getAdvanceById = async (req, res) => {
  try {
    const advance = await advanceService.getAdvanceById(req.params.id);
    sendResponse(res, 200, advance, "Avance encontrado");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

// Obtener avances de un empleado
export const getAdvancesByEmployee = async (req, res) => {
  try {
    const advances = await advanceService.getAdvancesByEmployee(
      req.params.employeeId
    );
    sendResponse(res, 200, advances, "Avances obtenidos exitosamente");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

// Actualizar un avance
export const updateAdvance = async (req, res) => {
  try {
    const updatedAdvance = await advanceService.updateAdvance(
      req.params.id,
      req.body
    );
    sendResponse(res, 200, updatedAdvance, "Avance actualizado exitosamente");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

// Eliminar un avance
export const deleteAdvance = async (req, res) => {
  try {
    await advanceService.deleteAdvance(req.params.id);
    sendResponse(res, 200, null, "Avance eliminado exitosamente");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};
