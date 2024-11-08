import * as clientService from "../services/clientService.js";
import sendResponse from "../utils/sendResponse.js";

export const createClient = async (req, res) => {
  try {
    const newClient = await clientService.createClient(req.body);
    sendResponse(res, 201, newClient, "Cliente creado exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    sendResponse(res, 200, client, "Cliente encontrado");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    sendResponse(res, 200, clients, "Clientes encontrados");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const updateClient = async (req, res) => {
  try {
    const updatedClient = await clientService.updateClient(
      req.params.id,
      req.body
    );
    sendResponse(res, 200, updatedClient, "Cliente actualizado exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const deleteClient = async (req, res) => {
  try {
    await clientService.deleteClient(req.params.id);
    sendResponse(res, 200, null, "Cliente eliminado correctamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const getClientByPhoneNumber = async (req, res) => {
  try {
    const client = await clientService.getClientByPhoneNumber(
      req.params.phoneNumber
    );
    sendResponse(res, 200, client, "Cliente encontrado");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

export const registerService = async (req, res) => {
  try {
    await clientService.registerService(req.params.id);
    sendResponse(res, 200, null, "Servicio registrado correctamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const registerReferral = async (req, res) => {
  try {
    await clientService.registerReferral(req.params.id);
    sendResponse(res, 200, null, "Referido registrado correctamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};
