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
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Employee", employeeModelSchema);
