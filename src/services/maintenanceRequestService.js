import MaintenanceRequest from "../models/maintenanceRequestModel.js";

const maintenanceRequestService = {
  createRequest: async (data) => {
    const newRequest = new MaintenanceRequest(data);
    return await newRequest.save();
  },

  getAllRequests: async () => {
    return await MaintenanceRequest.find()
      .sort({ createdAt: -1 })
      .populate("assignedEmployee");
  },

  getRequestById: async (id) => {
    const request = await MaintenanceRequest.findById(id).populate(
      "assignedEmployee"
    );
    if (!request) throw new Error("Solicitud no encontrada");
    return request;
  },

  updateRequestStatus: async (id, status) => {
    const request = await MaintenanceRequest.findById(id);
    if (!request) throw new Error("Solicitud no encontrada");

    request.status = status;
    return await request.save();
  },

  assignEmployee: async (requestId, employeeId) => {
    const request = await MaintenanceRequest.findById(requestId);
    if (!request) throw new Error("Solicitud no encontrada");

    request.assignedEmployee = employeeId;
    return await request.save();
  },

  deleteRequest: async (id) => {
    const request = await MaintenanceRequest.findById(id);
    if (!request) throw new Error("Solicitud no encontrada");

    await MaintenanceRequest.deleteOne({ _id: id });
    return { message: "Solicitud eliminada correctamente" };
  },

  // Nueva función para actualizar una solicitud
  updateRequest: async (id, data) => {
    const request = await MaintenanceRequest.findById(id);
    if (!request) throw new Error("Solicitud no encontrada");

    if (data.reporterName !== undefined) request.reporterName = data.reporterName;
    if (data.phoneNumber !== undefined) request.phoneNumber = data.phoneNumber;
    if (data.location !== undefined) request.location = data.location;
    if (data.damagedItem !== undefined) request.damagedItem = data.damagedItem;
    if (data.description !== undefined) request.description = data.description;
    if (data.photo !== undefined) request.photo = data.photo;
    if (data.isAnonymous !== undefined) request.isAnonymous = data.isAnonymous;

    return await request.save();
  },
};

export default maintenanceRequestService;