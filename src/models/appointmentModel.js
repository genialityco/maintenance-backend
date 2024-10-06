import mongoose from "mongoose";

const appointmentModelSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
})

export default mongoose.model('Appointment', appointmentModelSchema);