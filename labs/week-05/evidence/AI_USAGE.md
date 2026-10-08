# ENGSE203 LAB05 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
|  Gemini | ให้ช่วยหาเหตุผลว่าทำไม TODO ใน requestStorage.js ถึงไม่ผ่าน | ไม่ได้ใช้โค้ดโดยตรง แต่รู้จุดที่ต้องไปแก้เพิ่ม | source review / runtime test  | ไปเขียนเงื่อนไขเช็ค schemaVersion เพิ่มเติมด้วยตัวเอง และเอาคำว่า throwError(TODO) ออก |

คำรับรอง:

- [x] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ
- [x] ตรวจ source และรัน test ด้วยตนเอง
- [x] อธิบาย Route, Effect, Service Layer และ persistence ของ final code ได้
