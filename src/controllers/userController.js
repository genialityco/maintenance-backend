import * as userService from "../services/userService.js";
import sendResponse from "../utils/sendResponse.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    sendResponse(res, 201, newUser, "Usuario creado exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    sendResponse(res, 200, user, "Usuario encontrado");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    sendResponse(res, 200, users, "Usuarios encontrados");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    sendResponse(res, 200, updatedUser, "Usuario actualizado exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    sendResponse(res, 200, null, "Usuario eliminado correctamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const getUserByPhoneNumber = async (req, res) => {
  try {
    const user = await userService.getUserByPhoneNumber(req.params.phoneNumber);
    sendResponse(res, 200, user, "Usuario encontrado");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

export const registerService = async (req, res) => {
  try {
    await userService.registerService(req.params.id);
    sendResponse(res, 200, null, "Servicio registrado correctamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

export const registerReferral = async (req, res) => {
  try {
    await userService.registerReferral(req.params.id);
    sendResponse(res, 200, null, "Referido registrado correctamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};
