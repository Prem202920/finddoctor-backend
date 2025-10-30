import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    message: { type: String }
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
