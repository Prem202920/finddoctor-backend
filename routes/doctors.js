import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// GET all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// GET single doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Doctor not found" });
  }
});

// POST add a new doctor
router.post("/", async (req, res) => {
  try {
    const { name, specialization, city, contact, image, bio } = req.body;
    const newDoctor = new Doctor({ name, specialization, city, contact, image, bio });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ error: "Failed to add doctor" });
  }
});

// DELETE a doctor by ID
router.delete("/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete doctor" });
  }
});

export default router;
