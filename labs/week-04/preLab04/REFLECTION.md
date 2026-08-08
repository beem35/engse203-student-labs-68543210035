# Pre-LAB 04 Reflection — CP07

ชื่อ–นามสกุล:  ปัณณวัฒน์ สิทธิตัน
รหัสนักศึกษา:  68543210035-0

1. Component ใดเป็น state owner ของ tasks และ statusFilter เพราะเหตุใด?

   คำตอบ: App.jsx เพราะ เป็ณตัวที่รวบรวม Component อื่นๆ ที่ใช้ข้อมูลชุดหนึ่งร่วมกัน

2. ระบุตัวอย่าง Props ลงอย่างน้อย 2 จุด และ callback event ขึ้นอย่างน้อย 1 จุด

   คำตอบ:   
            2.1 เรียก <AppHeader/> มี title สำหรับตั้งหัวข้อ subtitle สำหรับหัวข้อรอง 
            2.2 เรียก <TaskList/> โดยดึงtasks และ ส่งตอ่ ไปให้ <TaskCard/> เพื่อแสดงแต่ละ task ออกมา
            2.3 เมื่อ TaskCard โดนกดปุ่มลบ จะเรียกผ่าน ฟังก์ชัน onDeleteTask ย้อนกับไปหา App เพื่อเรียกฟังก์ชัน  handleDeleteTask

3. เมื่อนำ pattern ไปใช้ LAB 4 ต้องเปลี่ยน data contract, validation และ component responsibility อย่างไร?

   คำตอบ: เปลื่ยนจาก Task เป็น request

