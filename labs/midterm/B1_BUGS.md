# B1 · บันทึกการแก้บั๊ก (กรอกให้ครบทั้ง 6 จุด)

> แต่ละบั๊กให้เขียน 4 อย่าง: ไฟล์ · บรรทัด · สาเหตุ (ทำไมทำงานผิด) · แก้อย่างไร
> เขียนด้วยคำของตัวเอง — จุดนี้จะถูกถามใน oral

## บั๊กที่ 1 — อาการ: Console เตือนสีเหลืองเรื่องรายการ
- ไฟล์/บรรทัด: src/components/RequestList.jsx: 9
- สาเหตุ: ไม่ได้ใส่ key
- แก้อย่างไร: เพิ่ม key={request.id} ลงใน RequestCard

## บั๊กที่ 2 — อาการ: ตัวเลข "รอดำเนินการ" ในแผงสรุปไม่ตรงกับที่เห็น
- ไฟล์/บรรทัด: src/pages/DashboardPage.jsx : 47 const summary 
- สาเหตุ: request.status === 'completed' ไปนับจำนวน ตัวที่เสร็จสิ้นแทน
- แก้อย่างไร: เปลี่ยนเป็น pending แทน 

## บั๊กที่ 3 — อาการ: กดตัวกรอง "รอดำเนินการ" แล้วได้รายการที่ไม่ใช่
- ไฟล์/บรรทัด: src/pages/DashboardPage.jsx : 55  const filteredRequests
- สาเหตุ: request.status !== statusFilter เงื่อนไขทำให้ ได้สถานะงานที่่ไม่ใช้ของตัวเองแทน
- แก้อย่างไร: เปลี่ยนเป็น === แทน

## บั๊กที่ 4 — อาการ: เปลี่ยน URL จาก REQ-001 เป็น REQ-002 แล้วข้อมูลไม่เปลี่ยน
- ไฟล์/บรรทัด: src/pages/RequestDetailPage.jsx:28 useEffect()
- สาเหตุ: useEffect มีการใช้ requestId แต่ไม่ได้ใส่ไว้ใน Dependency Array
- แก้อย่างไร: เพิ่ม requestId ลงใน Dependency Array

## บั๊กที่ 5 — อาการ: กด "ลบ" แล้วรายการยังอยู่ ต้องรีเฟรชถึงหาย
- ไฟล์/บรรทัด: src/pages/DashboardPage.jsx:65 function handleDelete()
- สาเหตุ: setRequests(requests) ใช้ array ตัวเก่า แทนที่จะใข้ nextRequests ทำให้ไม่ยอม render ใหม่
- แก้อย่างไร: เปลี่ยนเป็น setRequests(nextRequests);

## บั๊กที่ 6 — อาการ: กด "Reset Demo Data" แล้วหน้าพัง/ว่างเปล่า
- ไฟล์/บรรทัด: src/pages/DashboardPage.jsx:75 function handleReset()
- สาเหตุ: function resetRequests() เป็น async แต่ไม่มี await ทำให้ เกิด Runtime Error จนหน้าเว็บพัง
- แก้อย่างไร: ใส่ await ในการเรียก ฟังก์ชัน resetRequests()
