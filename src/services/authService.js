import Employee from "../models/employeeModel.js";
import Organization from "../models/organizationModel.js";
import bcrypt from "bcryptjs";

const authService = {
  authenticateUser: async (email, password) => {
    // Buscar en la colección de empleados
    let user = await Employee.findOne({ email }).populate("role");
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(user);
      return {
        ...user.toObject(),
        userType: "employee",
        organizationId: user.organizationId,
        userPermissions: [...user.role.permissions, ...user.customPermissions],
      };
    }

    // Buscar en la colección de organizaciones
    user = await Organization.findOne({ email }).populate("role");
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        ...user.toObject(),
        userType: "admin",
        organizationId: user._id,
        userPermissions: user.role.permissions,
      };
    }

    // Si no se encuentra el usuario o la contraseña no coincide
    throw new Error("Correo o contraseña incorrectos");
  },
};

export default authService;
