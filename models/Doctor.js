import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  city: String,
  contact: String,
  image: String,
  bio: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
