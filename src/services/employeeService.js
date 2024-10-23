import Employee from "../models/employeeModel.js";

// Crear un nuevo empleado
export const createEmployee = async (employeeData) => {
  const { names, position, email, phoneNumber, username, password } = employeeData;

  // Crear y guardar el nuevo empleado
  const newEmployee = new Employee({ names, position, email, phoneNumber, username, password });
  return await newEmployee.save();
};

// Obtener todos los empleados
export const getEmployees = async () => {
  return await Employee.find();
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
  const { names, position, email, phoneNumber, username, password } = employeeData;
  const employee = await Employee.findById(id);

  if (!employee) {
    throw new Error("Empleado no encontrado");
  }

  employee.names = names || employee.names;
  employee.position = position || employee.position;
  employee.email = email || employee.email;
  employee.phoneNumber = phoneNumber || employee.phoneNumber;
  employee.username = username || employee.username;
  employee.password = password || employee.password;

  return await employee.save();
};

// Eliminar un empleado
export const deleteEmployee = async (id) => {
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new Error("Empleado no encontrado");
  }

  await Employee.deleteOne({ _id: id });
  return { message: "Empleado eliminado correctamente" };
};
