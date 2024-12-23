import Client from "../models/clientModel.js";

const clientService = {
  // Crear un nuevo cliente
  createClient: async (clientData) => {
    const { name, email, phoneNumber, organizationId } = clientData;

    // Crear y guardar el nuevo cliente
    const newClient = new Client({ name, email, phoneNumber, organizationId });
    return await newClient.save();
  },

  // Obtener todos los clientes
  getClients: async () => {
    return await Client.find();
  },

  // Obtener clientes por organizationId
  getClientsByOrganizationId: async (organizationId) => {
    return await Client.find({ organizationId });
  },

  // Obtener un cliente por ID
  getClientById: async (id) => {
    const client = await Client.findById(id);
    if (!client) {
      throw new Error("Cliente no encontrado");
    }
    return client;
  },

  // Obtener un cliente por número de teléfono y organización
  getClientByPhoneNumberAndOrganization: async (
    phoneNumber,
    organizationId
  ) => {
    const client = await Client.findOne({ phoneNumber, organizationId }).populate("organizationId").exec();
    if (!client) {
      throw new Error("Cliente no encontrado");
    }
    return client;
  },

  // Actualizar un cliente
  updateClient: async (id, clientData) => {
    const { name, email, phoneNumber, organizationId } = clientData;
    const client = await Client.findById(id);

    if (!client) {
      throw new Error("Cliente no encontrado");
    }

    client.name = name || client.name;
    client.email = email || client.email;
    client.phoneNumber = phoneNumber || client.phoneNumber;
    client.organizationId = organizationId || client.organizationId;

    return await client.save();
  },

  // Eliminar un cliente
  deleteClient: async (id) => {
    const client = await Client.findById(id);
    if (!client) {
      throw new Error("Cliente no encontrado");
    }

    await Client.deleteOne({ _id: id });
    return { message: "Cliente eliminado correctamente" };
  },

  // Registrar un servicio para un cliente
  registerService: async (id) => {
    const client = await Client.findById(id);
    if (!client) {
      throw new Error("Cliente no encontrado");
    }
    return await client.incrementServices();
  },

  // Registrar un referido para un cliente
  registerReferral: async (id) => {
    const client = await Client.findById(id);
    if (!client) {
      throw new Error("Cliente no encontrado");
    }
    return await client.incrementReferrals();
  },
};

export default clientService;
