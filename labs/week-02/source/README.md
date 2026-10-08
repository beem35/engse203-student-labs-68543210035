# ENGSE203 Learning Dashboard

> LAB 02 — Modern JavaScript, Modules & Async Data

## ข้อมูลนักศึกษา

- **รหัสนักศึกษา:** `68543210035-0`
- **ชื่อ-นามสกุล:** ปัณณวัฒน์ สิทธิตัน
- **ระบบปฏิบัติการ:** Linux/MacOS
- **GitHub Pages URL:** [https://beem35.github.io/engse203-lab02-68543210035-0/](https://beem35.github.io/engse203-lab02-68543210035-0/)

## ภาพรวมของโปรเจกต์ (Project Overview)

เว็บแอปพลิเคชันแดชบอร์ดแสดงรายการการเรียนรู้ (Learning Dashboard) สำหรับวิชา ENGSE203 พัฒนาด้วย Modern JavaScript (ES Modules) และทำงานร่วมกับข้อมูลแบบ Asynchronous จากไฟล์ JSON ภายนอก โดยมีฟีเจอร์หลักดังนี้:

1. **แสดงรายการการเรียนรู้ (Learning Tasks):** แสดงการ์ดกิจกรรมแยกตามสัปดาห์ (Week) พร้อมป้ายแท็ก (Tags) และสถานะการดำเนินงาน (To do, In progress, Done)
2. **สรุปข้อมูลสถิติ (Stats Summary):** สรุปจำนวนงานทั้งหมด (Total Tasks) และจำนวนงานในแต่ละสถานะ (To do, In progress, Done) แบบเรียลไทม์ตามการกรองข้อมูล
3. **การค้นหาและกรองข้อมูล (Search & Filter):**
   - ค้นหาคำค้นหาที่ตรงกับชื่อวิชา (Title), รายละเอียด (Topic) หรือแท็ก (Tags) โดยไม่คำนึงถึงตัวอักษรพิมพ์เล็ก-ใหญ่ (Case-insensitive)
   - กรองรายการตามสถานะของงานด้วย Dropdown (All, To do, In progress, Done)
4. **จำลองการจัดการข้อผิดพลาด (Error Handling Simulation):** สามารถจำลองสภาวะเชื่อมต่อขัดข้อง (Error State) เพื่อทดสอบการรับมือของ UI โดยระบุพารามิเตอร์ `?simulateError=1` บน URL

## ขั้นตอนการติดตั้งและรันโปรเจกต์ (Installation and Run)

```bash
# ติดตั้ง dependencies
npm install

# ตรวจสอบโครงสร้างของโปรเจกต์
npm run check

# รันสำหรับ development mode (Local server)
npm run dev
```

## การคอมไพล์และพรีวิวโปรเจกต์ (Build and Preview)

```bash
# คอมไพล์โปรเจกต์เพื่อนำไปสร้าง production build (บันทึกในโฟลเดอร์ docs)
npm run build

# ทดสอบรันไฟล์ที่ผ่านการคอมไพล์แล้วบนเครื่องโลคอล
npm run preview
```

## หลักฐานการทดสอบ (Test Evidence)

- **สถานะการทำงานปกติ (Normal State):**
  ![Normal State](img/image-1.png)
- **สถานะเมื่อเกิดข้อผิดพลาด (Error State) จากการใส่ `?simulateError=1`:**
  ![Error State](img/image.png)

## ปัญหาที่พบและแนวทางการแก้ไข (Problems and Fixes)

### 1. ปัญหาเส้นทางไฟล์ JSON (Asset Path) บน GitHub Pages ไม่ถูกต้อง
- **รายละเอียดปัญหา:** เนื่องจากโครงการถูกอัปโหลดขึ้น GitHub Pages ซึ่งโครงสร้าง URL ของเว็บไซต์ย่อยจะมีชื่อ Repository ต่อท้ายเสมอ เช่น `/engse203-lab02-68543210035-0/` หากเราเรียกใช้ URL ไฟล์ข้อมูลแบบปกติ เช่น `/data/learning-tasks.json` เว็บบราวเซอร์จะมองหาไฟล์ที่รากของโดเมน (`https://beem35.github.io/data/...`) ส่งผลให้เกิดข้อผิดพลาด 404 (Not Found)
- **แนวทางการแก้ไข:** นำ `import.meta.env.BASE_URL` มาเชื่อมนำหน้าชื่อไฟล์ใน `src/api.js` เพื่อให้ระบบดึง path ปัจจุบันโดยอัตโนมัติ และแก้ไขค่า `repositoryName` ในไฟล์ `vite.config.js` ให้ตรงกับชื่อของ Repository บน GitHub (`engse203-lab02-68543210035-0`)

### 2. ปัญหาการค้นหาคีย์เวิร์ดในหลายคอลัมน์ (Multi-field search filter)
- **รายละเอียดปัญหา:** จำเป็นต้องกรองข้อมูลการ์ดงานผ่านการพิมพ์ในอินพุตช่องเดียว โดยจะต้องครอบคลุมทั้งชื่อบทเรียน (Title) คำอธิบาย (Topic) และแท็กต่าง ๆ (Tags) ซึ่งเป็น Array หากเขียนเงื่อนไขตรวจสอบแยกจากกันจะทำให้โค้ดซับซ้อนและมีขนาดใหญ่
- **แนวทางการแก้ไข:** ในฟังก์ชัน `filterTasks` ที่ `src/utils.js` ได้แก้ปัญหาโดยการนำ `title`, `topic` และข้อมูลสมาชิกทั้งหมดใน `tags` มารวมกันเป็น String เดียวคั่นด้วยเว้นวรรค แปลงผลลัพธ์เป็นตัวพิมพ์เล็ก (Lowercase) จากนั้นจึงทำการค้นหาคำผ่านเมธอด `.includes()` เพียงครั้งเดียว ซึ่งทำให้โค้ดมีความกระชับและรองรับการค้นหาได้ครบถ้วนทุกองค์ประกอบ

## เอกสารอ้างอิงและการช่วยเหลือจาก AI (References & AI Assistance)

- **เอกสารอ้างอิงและคู่มือการศึกษา:**
  - [Vite Guide: Env Variables and Modes](https://vite.dev/guide/env-and-mode.html) - การใช้งาน `import.meta.env.BASE_URL`
  - [MDN Web Docs: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - การเชื่อมต่อและดึงข้อมูล JSON แบบ Asynchronous
  - [MDN Web Docs: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) - การใช้ reduce เพื่อคำนวณและสรุปข้อมูลสถิติ
- **การใช้งาน AI ช่วยเหลือ (AI Assistance):**
  - ใช้ AI ของผู้ช่วยอัจฉริยะในการตรวจสอบความเรียบร้อยและโครงสร้างของไฟล์ทั้งหมดในโปรเจกต์
  - ช่วยแก้ไขข้อมูลการตั้งค่าชื่อ repository ใน `vite.config.js` ให้สอดคล้องกันเพื่อป้องกันปัญหา path บนหน้าเว็บจริง
  - ช่วยเขียนปรับปรุงคำอธิบายและแนวทางการเขียน README ฉบับนี้ให้สมบูรณ์ขึ้นเป็นภาษาไทย