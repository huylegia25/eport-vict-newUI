import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET /api/search/edo?containerCode=...&orderId=...
router.get("/edo", async (req, res) => {
  const { containerCode, orderId } = req.query;
  try {
    const [rows] = await pool.query(
      `SELECT o.id, o.created_at, o.status, 
              u1.name AS logistics_name,
              d.name AS driver_name,
              u2.name AS shippingline_name,
              c.code AS container_code
       FROM orders o
       JOIN users u1 ON o.logistics_id = u1.id
       JOIN drivers d ON o.drivers_id = d.id
       JOIN users u2 ON o.shippinglines_id = u2.id
       JOIN containers c ON o.containers_id = c.id
       WHERE o.id = ? AND c.code = ?`,
      [orderId, containerCode]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ SQL error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/search/container?containerCode=...
router.get("/container", async (req, res) => {
  const { containerCode } = req.query;
  try {
    const [rows] = await pool.query(
      "SELECT id, code, status FROM containers WHERE code = ?",
      [containerCode]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Container not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ SQL error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
