import Role from "../models/roleModel.js";

const roleService = {
  // Crear un nuevo rol
  createRole: async (name, permissions) => {
    const role = new Role({ name, permissions });
    return await role.save();
  },

  // Obtener todos los roles
  getAllRoles: async () => {
    return await Role.find();
  },

  // Obtener un rol por ID
  getRoleById: async (roleId) => {
    return await Role.findById(roleId);
  },

  // Actualizar un rol por ID
  updateRole: async (roleId, data) => {
    return await Role.findByIdAndUpdate(roleId, data, { new: true });
  },

  // Eliminar un rol por ID
  deleteRole: async (roleId) => {
    return await Role.findByIdAndDelete(roleId);
  },
};

export default roleService;
