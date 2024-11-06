import mongoose from "mongoose";

const advanceModelSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "Avance de salario",
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Advance", advanceModelSchema);
