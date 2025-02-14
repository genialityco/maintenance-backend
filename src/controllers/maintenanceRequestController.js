import maintenanceRequestService from "../services/maintenanceRequestService.js";
import sendResponse from "../utils/sendResponse.js";

const maintenanceRequestController = {
  createRequest: async (req, res) => {
    try {
      const newRequest = await maintenanceRequestService.createRequest(
        req.body
      );
      sendResponse(
        res,
        201,
        newRequest,
        "Solicitud de mantenimiento creada exitosamente"
      );
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  getAllRequests: async (req, res) => {
    try {
      const requests = await maintenanceRequestService.getAllRequests();
      sendResponse(res, 200, requests, "Solicitudes obtenidas exitosamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  getRequestById: async (req, res) => {
    try {
      const request = await maintenanceRequestService.getRequestById(
        req.params.id
      );
      sendResponse(res, 200, request, "Solicitud encontrada");
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },

  updateRequestStatus: async (req, res) => {
    try {
      const updatedRequest =
        await maintenanceRequestService.updateRequestStatus(
          req.params.id,
          req.body.status
        );
      sendResponse(
        res,
        200,
        updatedRequest,
        "Estado de la solicitud actualizado"
      );
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },

  assignEmployee: async (req, res) => {
    try {
      const { employeeId } = req.body;
      const updatedRequest = await maintenanceRequestService.assignEmployee(
        req.params.id,
        employeeId
      );
      sendResponse(res, 200, updatedRequest, "Empleado asignado correctamente");
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },

  deleteRequest: async (req, res) => {
    try {
      await maintenanceRequestService.deleteRequest(req.params.id);
      sendResponse(res, 200, null, "Solicitud eliminada correctamente");
    } catch (error) {
      sendResponse(res, 404, null, error.message);
    }
  },

  updateMaintenanceRequest: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
  
      const updatedRequest = await maintenanceRequestService.updateRequest(id, data);
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

export default maintenanceRequestController;
