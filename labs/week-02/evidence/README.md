# Week 02 Evidence

![หน้าจอการแสดงผลเมื่อโหลดข้อมูลสำเร็จ (Success State)](../source/img/image-1.png)

![หน้าจอการแสดงผลเมื่อเกิดข้อผิดพลาดในการโหลดข้อมูล (Error State)](../source/img/image.png)

![ผลการรันคำสั่ง npm run check ผ่านสำเร็จ](image.png)

![ผลการรันคำสั่ง npm run build (vite build) สำเร็จ](image-1.png)

## Reflection

การใช้ Vite ช่วยจัดการในเรื่องของโครงสร้างไฟล์และ Asset Path (ผ่าน `import.meta.env.BASE_URL` และ `vite.config.js`) ทำให้เมื่อนำผลลัพธ์ที่อยู่ในโฟลเดอร์ publish นี้ไปรวมกับ Lab อื่นๆ เพื่อแสดงผลบน GitHub Pages จึงสามารถทำงานได้สมบูรณ์ ไม่เกิดปัญหา Path 404 และสามารถทดสอบระบบจำลอง Error, ค้นหา และกรองข้อมูลได้อย่างมีประสิทธิภาพครับ

