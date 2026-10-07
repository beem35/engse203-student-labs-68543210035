import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import { login } from "../services/authService.js";

function LoginPage() {
  const navigate = useNavigate();

  async function handleLogin(email, password) {
    await login(email, password);
    navigate("/");
  }

  return (
    <section data-testid="page-login">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">STAFF AUTHENTICATION</p>
          <h1>เข้าสู่ระบบเจ้าหน้าที่</h1>
          <p>เข้าสู่ระบบเพื่อจัดการคำร้อง เปลี่ยนสถานะ และลบรายการ</p>
        </div>
      </div>
      <section className="panel form-panel">
        <LoginForm onLogin={handleLogin} />
      </section>
    </section>
  );
}

export default LoginPage;
