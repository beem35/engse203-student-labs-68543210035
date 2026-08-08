import { useState } from "react";

// รับ prop onAddTask มาจาก App.jsx                                                                      
function TaskForm({ onAddTask }) {
    // 1. สร้าง State สำหรับเก็บข้อมูลฟอร์มหลายๆ ช่อง (เป็น Object)                                                
    const initialForm = { title: '', category: '' };
    const [formData, setFormData] = useState(initialForm);

    // 2. สร้าง State สำหรับแจ้งเตือน                                                                          
    const [errors, setErrors] = useState({});
    const [feedback, setFeedback] = useState('');

    // 3. ใส่ฟังก์ชัน handleChange (อัปเดต state เมื่อผู้ใช้พิมพ์)                                                    
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }

    // 4. ใส่ฟังก์ชัน validateTask (ตรวจสอบข้อมูล)                                                              
    function validateTask(formData) {
        const errors = {};
        if (formData.title.trim().length < 3) {
            errors.title = 'ชื่องานต้องมีอย่างน้อย 3 ตัวอักษร';
        }
        if (!formData.category) {
            errors.category = 'กรุณาเลือกหมวดหมู่';
        }
        return errors;
    }

    // 5. ใส่ฟังก์ชัน handleSubmit (ตรวจสอบก่อนส่งข้อมูล)                                                         
    function handleSubmit(event) {
        event.preventDefault();
        const nextErrors = validateTask(formData);

        // ถ้ามี Error ให้หยุดทำและโชว์ Error                                                                     
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setFeedback('');
            return;
        }

        // ถ้าข้อมูลผ่าน ส่งข้อมูลกลับไปให้ App.jsx ผ่าน onAddTask                                                    
        onAddTask(formData);
        setFormData(initialForm);
        setErrors({});
        setFeedback('เพิ่มรายการสำเร็จ');
    }

    return (
        <form onSubmit={handleSubmit} className="task-form">
            {/* โชว์ Feedback ถ้ามี */}
            {feedback && <p role="status" className="success-msg">{feedback}</p>}

            <div className="form-group">
                {/* 6. นำ JSX ที่ได้มาใส่ */}
                <label htmlFor="title">ชื่องาน</label>
                <input
                    id="title"
                    name="title" // <-- ตรงกับชื่อ Key ใน State formData                                             
                    value={formData.title}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {/* แสดงข้อความ Error กรณีพิมพ์ผิดเงื่อนไข */}
                {errors.title && (
                    <p id="title-error" className="field-error" style={{ color: 'red' }}>
                        {errors.title}
                    </p>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="category">หมวดหมู่</label>
                <select
                    id="category"
                    name="category" // <-- ตรงกับชื่อ Key ใน State formData                                          
                    value={formData.category}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? 'category-error' : undefined}
                >
                    <option value="">-- เลือก --</option>
                    <option value="general">ทั่วไป</option>
                    <option value="coding">เขียนโค้ด</option>
                    <option value="reading">อ่านหนังสือ</option>
                </select>
                {errors.category && (
                    <p id="category-error" className="field-error" style={{ color: 'red' }}>{errors.category}</p>
                )}
            </div>

            <button type="submit">เพิ่มงาน</button>
        </form>
    );
}

export default TaskForm;