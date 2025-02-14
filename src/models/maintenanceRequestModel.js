import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    reporterName: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    damagedItem: {
      type: String,
      required: true,
      enum: ["WALL", "FLOOR", "WINDOW", "BULB"],
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "In process", "Complete"],
      default: "Pending",
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    assignedEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: false, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
