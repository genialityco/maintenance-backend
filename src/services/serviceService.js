import Service from "../models/serviceModel.js";

// Crear un nuevo servicio
export const createService = async (serviceData) => {
  const { images, name, description, price, duration, type } = serviceData;

  const newService = new Service({
    images,
    name,
    description,
    price,
    duration,
    type
  });

  return await newService.save();
};

// Obtener todos los servicios
export const getServices = async () => {
  return await Service.find();
};

// Obtener un servicio por ID
export const getServiceById = async (id) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new Error("Servicio no encontrado");
  }
  return service;
};

// Actualizar un servicio
export const updateService = async (id, updatedData) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new Error("Servicio no encontrado");
  }

  service.set(updatedData);
  return await service.save();
};

// Eliminar un servicio
export const deleteService = async (id) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new Error("Servicio no encontrado");
  }

  await service.deleteOne();
  return { message: "Servicio eliminado correctamente" };
};
