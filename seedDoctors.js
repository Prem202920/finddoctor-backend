// seedDoctors.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./models/Doctor.js"; // Make sure your Doctor model exists

dotenv.config();

const doctors = [
  { name: "Dr. Mangesh Bhople", specialization: "Cardiologist", city:"Pune", contact: "+91 98765 43210", image: "images/doctor1.jpg", bio: "Expert in treating heart diseases with 10+ years of experience." },
  { name: "Dr. Shubham Kamble", specialization: "Dermatologist", city:"Mumbai", contact: "+91 91234 56789", image: "images/doctor2.webp", bio: "Specializes in skin care and cosmetic treatments." },
  { name: "Dr. Anjali Sharma", specialization: "Neurologist", city:"Nashik", contact: "+91 99887 66554", image: "images/doctor3.webp", bio: "Focused on treating nervous system disorders and neurological care." },
  { name: "Dr. Sumit Malabade", specialization: "Pediatrician", city:"Nagpur", contact: "+91 98711 22334", image: "images/doctor4.jpg", bio: "Caring pediatrician experienced in child health and wellness." },
  { name: "Dr. Mohit Yoddha", specialization: "Gynecologist", city:"Mumbai", contact: "+91 97654 32109", image: "images/doctor5.webp", bio: "Expert in women’s reproductive health and maternity care." },
  { name: "Dr. Rohit Sharma", specialization: "Orthopedic", city:"Satara", contact: "+91 91222 33445", image: "images/doctor6.jpeg", bio: "Specialist in bone, joint, and muscle treatments." },
  { name: "Dr. Sunil Jadhav", specialization: "Dentist", city:"Nashik", contact: "+91 97654 32109", image: "images/doctor7.jpg", bio: "Dedicated to improving oral health and bright smiles." },
  { name: "Dr. Kavita Patil", specialization: "Dermatologist", city:"Pune", contact: "+91 91222 37666", image: "images/doctor8.png", bio: "Skin specialist with focus on acne and laser treatments." }
];

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");

    // Optional: clear existing doctors first
    await Doctor.deleteMany({});
    console.log("🗑️ Cleared existing doctors");

    // Insert doctors
    await Doctor.insertMany(doctors);
    console.log("✅ Doctors inserted successfully");

    process.exit(); // exit script
  } catch (err) {
    console.error("❌ Error inserting doctors:", err);
    process.exit(1);
  }
};

start();
