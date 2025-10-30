import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ ok: true, message: "API test OK" });
});

export default router;
