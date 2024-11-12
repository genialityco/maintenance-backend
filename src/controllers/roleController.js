import roleService from "../services/roleService.js";
import sendResponse from "../utils/sendResponse.js";

const roleController = {
  // Controlador para crear un nuevo rol
  createRole: async (req, res) => {
    const { name, permissions } = req.body;
    try {
      const newRole = await roleService.createRole(name, permissions);
      sendResponse(res, 201, newRole, "Rol creado exitosamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para obtener todos los roles
  getAllRoles: async (req, res) => {
    try {
      const roles = await roleService.getAllRoles();
      sendResponse(res, 200, roles, "Roles obtenidos exitosamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para obtener un rol específico por ID
  getRoleById: async (req, res) => {
    const { roleId } = req.params;
    try {
      const role = await roleService.getRoleById(roleId);
      if (!role) return sendResponse(res, 404, null, "Rol no encontrado");
      sendResponse(res, 200, role, "Rol encontrado");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para actualizar un rol
  updateRole: async (req, res) => {
    const { roleId } = req.params;
    const data = req.body;
    try {
      const updatedRole = await roleService.updateRole(roleId, data);
      if (!updatedRole)
        return sendResponse(res, 404, null, "Rol no encontrado");
      sendResponse(res, 200, updatedRole, "Rol actualizado exitosamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },

  // Controlador para eliminar un rol
  deleteRole: async (req, res) => {
    const { roleId } = req.params;
    try {
      const deletedRole = await roleService.deleteRole(roleId);
      if (!deletedRole)
        return sendResponse(res, 404, null, "Rol no encontrado");
      sendResponse(res, 200, null, "Rol eliminado exitosamente");
    } catch (error) {
      sendResponse(res, 500, null, error.message);
    }
  },
};

export default roleController;
