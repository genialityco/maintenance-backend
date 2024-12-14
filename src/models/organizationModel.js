import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  instagramUrl: {
    type: String,
    required: false,
  },
  facebookUrl: {
    type: String,
    required: false,
  },
  whatsappUrl: {
    type: String,
    required: false,
  },
  tiktokUrl: {
    type: String,
    required: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Organization", organizationSchema);
