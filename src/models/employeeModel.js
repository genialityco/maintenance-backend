import mongoose from "mongoose";

const employeeModelSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: false,
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: false,
    default: "67300292f3bc5c256d80e47d",
  },
  customPermissions: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/6cx9tc1kx/default_smile.png?updatedAt=1732716506174",
    required: false,
  },
  color : {
    type: String,
    required: false
  }
});

export default mongoose.model("Employee", employeeModelSchema);
