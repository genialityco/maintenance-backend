import * as employeeService from "../services/employeeService.js";
import sendResponse from "../utils/sendResponse.js";

// Crear un nuevo empleado
export const createEmployee = async (req, res) => {
  try {
    const newEmployee = await employeeService.createEmployee(req.body);
    sendResponse(res, 201, newEmployee, "Empleado creado exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

// Obtener todos los empleados
export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    sendResponse(res, 200, employees, "Empleados obtenidos exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

// Obtener un empleado por ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    sendResponse(res, 200, employee, "Empleado encontrado");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

// Actualizar un empleado
export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
    sendResponse(res, 200, updatedEmployee, "Empleado actualizado exitosamente");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

// Eliminar un empleado
export const deleteEmployee = async (req, res) => {
  try {
    const result = await employeeService.deleteEmployee(req.params.id);
    sendResponse(res, 200, null, result.message);
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};
