import Organization from "../models/organizationModel.js";
import bcrypt from "bcryptjs";

const organizationService = {
  // Crear una nueva organización
  createOrganization: async (organizationData) => {
    const {
      name,
      email,
      password,
      phoneNumber,
      role,
      instagramUrl,
      facebookUrl,
      whatsappUrl,
      tiktokUrl,
      isActive,
    } = organizationData;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const newOrganization = new Organization({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      isActive,
      instagramUrl,
      facebookUrl,
      whatsappUrl,
      tiktokUrl,
    });

    const savedOrganization = await newOrganization.save();

    // Ocultar el campo password antes de devolver la organización creada
    savedOrganization.password = undefined;
    return savedOrganization;
  },

  // Obtener todas las organizaciones
  getOrganizations: async () => {
    return await Organization.find()
      .select("-password")
      .populate("role")
      .exec();
  },

  // Obtener una organización por ID
  getOrganizationById: async (id) => {
    const organization = await Organization.findById(id)
      .select("-password")
      .populate("role");
    if (!organization) {
      throw new Error("Organización no encontrada");
    }
    return organization;
  },

  // Actualizar una organización
  updateOrganization: async (id, organizationData) => {
    const { name, email, password, phoneNumber, role, isActive } =
      organizationData;
    const organization = await Organization.findById(id);

    if (!organization) {
      throw new Error("Organización no encontrada");
    }

    organization.name = name !== undefined ? name : organization.name;
    organization.email = email !== undefined ? email : organization.email;
    organization.phoneNumber =
      phoneNumber !== undefined ? phoneNumber : organization.phoneNumber;
    organization.role = role !== undefined ? role : organization.role;
    organization.isActive =
      isActive !== undefined ? isActive : organization.isActive;

    // Encriptar la contraseña solo si se proporciona una nueva
    if (password) {
      organization.password = await bcrypt.hash(password, 10);
    }

    const updatedOrganization = await organization.save();

    // Ocultar el campo password antes de devolver la organización actualizada
    updatedOrganization.password = undefined;
    return updatedOrganization;
  },

  // Eliminar una organización
  deleteOrganization: async (id) => {
    const organization = await Organization.findById(id);
    if (!organization) {
      throw new Error("Organización no encontrada");
    }

    await Organization.deleteOne({ _id: id });
    return { message: "Organización eliminada correctamente" };
  },
};

export default organizationService;
