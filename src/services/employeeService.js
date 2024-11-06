import Employee from "../models/employeeModel.js";
import Appointment from "../models/appointmentModel.js";

// Crear un nuevo empleado
export const createEmployee = async (employeeData) => {
  const { names, position, email, phoneNumber, services, username, password } =
    employeeData;

  // Crear y guardar el nuevo empleado
  const newEmployee = new Employee({
    names,
    position,
    email,
    phoneNumber,
    services,
    username,
    password,
  });
  return await newEmployee.save();
};

// Obtener todos los empleados
export const getEmployees = async () => {
  return await Employee.find().populate("services").exec();
};

// Obtener un empleado por ID
export const getEmployeeById = async (id) => {
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new Error("Empleado no encontrado");
  }
  return employee;
};

// Obtener un empleado por número de teléfono
export const getEmployeeByPhoneNumber = async (phoneNumber) => {
  const employee = await Employee.findOne({ phoneNumber });
  if (!employee) {
    throw new Error("Empleado no encontrado");
  }
  return employee;
};

// Actualizar un empleado
export const updateEmployee = async (id, employeeData) => {
  const {
    names,
    position,
    email,
    phoneNumber,
    services,
    username,
    password,
    isActive,
  } = employeeData;
  const employee = await Employee.findById(id);

  if (!employee) {
    throw new Error("Empleado no encontrado");
  }

  employee.names = names !== undefined ? names : employee.names;
  employee.position = position !== undefined ? position : employee.position;
  employee.email = email !== undefined ? email : employee.email;
  employee.phoneNumber =
    phoneNumber !== undefined ? phoneNumber : employee.phoneNumber;
  employee.services = services !== undefined ? services : employee.services;
  employee.username = username !== undefined ? username : employee.username;
  employee.password = password !== undefined ? password : employee.password;
  employee.isActive = isActive !== undefined ? isActive : employee.isActive;

  return await employee.save();
};

// Eliminar un empleado
export const deleteEmployee = async (id) => {
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new Error("Empleado no encontrado");
  }

  const appointments = await Appointment.find({ employee: id });
  if (appointments.length > 0) {
    throw new Error("No puedes eliminar un empleado con citas asignadas");
  }

  await Employee.deleteOne({ _id: id });
  return { message: "Empleado eliminado correctamente" };
};
