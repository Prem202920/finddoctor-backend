import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// POST create a new appointment
router.post("/", async (req, res) => {
  try {
    const { doctorId, patientName, phone, date, message } = req.body;
    const newAppointment = new Appointment({ doctorId, patientName, phone, date, message });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to book appointment" });
  }
});

// GET all appointments (optional, for admin panel/testing)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId", "name specialization");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

export default router;
