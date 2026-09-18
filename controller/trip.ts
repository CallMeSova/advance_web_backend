import express from "express";
import { conn } from "../dbconnect";
import { Trip } from "../model/trip";

export const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Get in trip.ts");
// });

// router.get("/", (req, res) => {
//   if (req.query.id) {
//     res.send("Get in trip.ts Query id: " + req.query.id);
//   } else {
//     res.send("Get in trip.ts");
//   }
// });

router.get("/", async (req, res) => {
  const [rows] = await conn.query("SELECT * FROM trip");
  let trips = rows as Trip[];
  res.json(trips);
});

// router.get("/:id", (req, res) => {
//   res.send("Get in trip.ts id: " + req.params.id);
// });

router.get("/:idx", async (req, res) => {
  // ใช้เครื่องหมาย ? (Placeholder) เสมอ เพื่อส่งตัวแปรไปแทนค่าในคำสั่ง SQL ป้องกันภัยความปลอดภัย SQL Injection
  const [rows] = await conn.query("SELECT * FROM trip WHERE idx = ?", [
    req.params.idx,
  ]);
  res.json(rows);
});

// router.post("/", (req, res) => {
//   let body = req.body;
//   res.status(201);
//   res.json(body);
// });

router.post("/", (req, res) => {
  let body = req.body;
  res.status(201).json(body);
});

router.get("/search/fields", async (req, res) => {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM trip WHERE (idx IS NULL OR idx = ?) OR (name IS NULL OR name LIKE ?)",
      [req.query.id, "%" + req.query.name + "%"],
    );
    res.json(rows);
  } catch (error) {
    // ดักจับ Error กรณีทำงานผิดพลาด เพื่อไม่ให้ระบบหลังบ้านพังล่มไปดื้อๆ
    res.status(500).json({ error: "Internal server error" });
  }
});
