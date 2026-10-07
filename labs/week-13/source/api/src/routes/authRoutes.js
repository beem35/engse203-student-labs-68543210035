import { Router } from "express";
import * as authService from "../services/authService.js";
import { validateLoginInput } from "../validators/requestValidator.js";

const router = Router();

// -------------------------------------------------------------
// ⭐ Challenge: จำกัดการเดารหัสผ่านผิด 5 ครั้งใน 15 นาที → 429
// -------------------------------------------------------------
const failedAttempts = new Map(); // เก็บ key: email -> [timestamp, timestamp, ...]
const WINDOW_MS = 15 * 60 * 1000; // 15 นาที
const MAX_ATTEMPTS = 5;

/**
 * เคลียร์ข้อมูล rate limit ทั้งหมด
 * ใช้สำหรับ beforeEach ใน test และ checker ของ Week 13
 */
export function resetLoginLimiter() {
  failedAttempts.clear();
}

router.post("/login", (req, res) => {
  const emailKey = req.body?.email
    ? String(req.body.email).trim().toLowerCase()
    : (req.ip ?? "unknown");
  const now = Date.now();

  // กรองเก็บเฉพาะเวลาที่ยังอยู่ในหน้าต่าง 15 นาทีล่าสุด
  const attempts = (failedAttempts.get(emailKey) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );
  failedAttempts.set(emailKey, attempts);

  // ตรวจสอบว่าเดารหัสผิดครบ 5 ครั้งแล้วหรือไม่
  if (attempts.length >= MAX_ATTEMPTS) {
    return res.status(429).json({
      error: "ลองเข้าสู่ระบบผิดเกิน 5 ครั้ง กรุณารอ 15 นาที",
    });
  }

  // ตรวจความถูกต้องของ input
  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ error: "ข้อมูลเข้าสู่ระบบไม่ถูกต้อง", details: errors });
  }

  // ตรวจสอบการยืนยันตัวตน
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    // ล็อกอินไม่สำเร็จ (รหัสผิด หรือไม่มีอีเมลนี้) -> บันทึก timestamp
    attempts.push(now);
    failedAttempts.set(emailKey, attempts);
    return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }

  // ล็อกอินสำเร็จ -> เคลียร์ประวัติความผิดพลาดของอีเมลนี้
  failedAttempts.delete(emailKey);
  res.status(200).json(result);
});

export default router;
