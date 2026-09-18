import express from "express";
import { conn } from "../dbconnect";
import { Trip } from "../model/trip";
import { TripPostRequest } from "../model/trip";

export const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await conn.query("SELECT * FROM trip");
  let trips = rows as Trip[];
  res.json(trips);
});

router.get("/:idx", async (req, res) => {
  // ใช้เครื่องหมาย ? (Placeholder) เสมอ เพื่อส่งตัวแปรไปแทนค่าในคำสั่ง SQL ป้องกันภัยความปลอดภัย SQL Injection
  const [rows] = await conn.query("SELECT * FROM trip WHERE idx = ?", [
    req.params.idx,
  ]);
  res.json(rows);
});

router.post("/", async (req, res) => {
  try {
    let trip: TripPostRequest = req.body;
    console.log(req.body);

    let sql =
      "INSERT INTO `trip`(`name`, `country`, `destinationid`, `coverimage`, `detail`, `price`, `duration`) VALUES (?,?,?,?,?,?,?)";

    const [result] = await conn.query(sql, [
      trip.name,
      trip.country,
      trip.destinationid,
      trip.coverimage,
      trip.detail,
      trip.price,
      trip.duration,
    ]);

    // แปลงผลลัพธ์เพื่อนำมาสกัดหาข้อมูลแถวที่ทำรายการสำเร็จ
    const insertResult = result as any;
    res.status(201).json({
      affected_row: insertResult.affectedRows, // จำนวนแถวที่ได้รับผลกระทบ (สำเร็จ = 1)
      last_idx: insertResult.insertId, // รหัสไอดีล่าสุดที่ระบบสร้างขึ้นให้อัตโนมัติ (Auto increment id)
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
