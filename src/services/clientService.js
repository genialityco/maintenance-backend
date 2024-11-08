import Client from "../models/clientModel.js";

// Crear un nuevo cliente
export const createClient = async (clientData) => {
  const { name, email, phoneNumber } = clientData;

  // Verificar si el cliente ya existe
  // const existingClient = await Client.findOne({ email });
  // if (existingClient) {
  //   throw new Error("El cliente con este correo ya existe");
  // }

  // Crear y guardar el nuevo cliente
  const newClient = new Client({ name, email, phoneNumber });
  return await newClient.save();
};

// Obtener todos los clientes
export const getClients = async () => {
  return await Client.find();
};

// Obtener un cliente por ID
export const getClientById = async (id) => {
  const client = await Client.findById(id);
  if (!client) {
    throw new Error("Cliente no encontrado");
  }
  return client;
};

// Obtener un cliente por número de teléfono
export const getClientByPhoneNumber = async (phoneNumber) => {
  const client = await Client.findOne({ phoneNumber });
  if (!client) {
    throw new Error("Cliente no encontrado");
  }
  return client;
};

// Actualizar un cliente
export const updateClient = async (id, clientData) => {
  const { name, email, phoneNumber } = clientData;
  const client = await Client.findById(id);

  if (!client) {
    throw new Error("Cliente no encontrado");
  }

  client.name = name || client.name;
  client.email = email || client.email;
  client.phoneNumber = phoneNumber || client.phoneNumber;

  return await client.save();
};

// Eliminar un cliente
export const deleteClient = async (id) => {
  const client = await Client.findById(id);
  if (!client) {
    throw new Error("Cliente no encontrado");
  }

  await Client.deleteOne({ _id: id });
  return { message: "Cliente eliminado correctamente" };
};

// Registrar un servicio para un cliente
export const registerService = async (id) => {
  const client = await Client.findById(id);
  if (!client) {
    throw new Error("Cliente no encontrado");
  }
  return await client.incrementServices();
};

// Registrar un referido para un cliente
export const registerReferral = async (id) => {
  const client = await Client.findById(id);
  if (!client) {
    throw new Error("Cliente no encontrado");
  }
  return await client.incrementReferrals();
};
