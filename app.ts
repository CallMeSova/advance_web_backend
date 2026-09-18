import express from "express";
import { router as index } from "./controller/index";
import { router as trip } from "./controller/trip";

export const app = express();

// app.use("/", (req, res) => {
//   res.send("Hello World!!!");
// });

// แปลงข้อมูลแบบข้อความทั่วไป (Text Body)
app.use(express.text());

// แปลงข้อมูลรูปแบบ JSON (JSON Body)
app.use(express.json());

app.use("/", index);
app.use("/trip", trip);
