// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// route imports
import testRoutes from "./routes/test.js";
import doctorsRoutes from "./routes/doctors.js";
import usersRoutes from "./routes/users.js";
import appointmentsRoutes from "./routes/appointments.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ----- Middlewares -----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploaded images/static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----- Routes -----
app.use("/api", testRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/appointments", appointmentsRoutes);

// root route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "FindDoctor backend running" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal Server Error"
  });
});

// MongoDB connection and server start
const startServer = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.warn("⚠️  MONGO_URI not set in .env — starting server without DB connection.");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // Log host and database name so we can confirm which DB we're connected to
    console.log(`✅ Connected to MongoDB: ${conn.connection.host}/${conn.connection.name}`);
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    app.listen(PORT, () => console.log(`⚠️ Server running without DB on http://localhost:${PORT}`));
  }
};

startServer();
