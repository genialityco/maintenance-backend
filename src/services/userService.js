import User from "../models/userModel.js";

// Crear un nuevo usuario
export const createUser = async (userData) => {
  const { name, email, phoneNumber } = userData;

  // Verificar si el usuario ya existe
  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   throw new Error("El usuario con este correo ya existe");
  // }

  // Crear y guardar el nuevo usuario
  const newUser = new User({ name, email, phoneNumber });
  return await newUser.save();
};

// Obtener todos los usuarios
export const getUsers = async () => {
  return await User.find();
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return user;
};

// Obtener un usuario por número de teléfono
export const getUserByPhoneNumber = async (phoneNumber) => {
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return user;
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
  const { name, email, phoneNumber } = userData;
  const user = await User.findById(id);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.phoneNumber = phoneNumber || user.phoneNumber;

  return await user.save();
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  await User.deleteOne({ _id: id });
  return { message: "Usuario eliminado correctamente" };
};

// Registrar un servicio para un usuario
export const registerService = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return await user.incrementServices();
};

// Registrar un referido para un usuario
export const registerReferral = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return await user.incrementReferrals();
};
