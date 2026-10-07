import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService.js";
const links = [
  ["/", "Dashboard"],
  ["/requests/new", "New Request"],
  ["/about", "About"],
];

function AppHeader() {
  const location = useLocation(); // ติดตามการเปลี่ยนหน้า เพื่อให้ Header รีเฟรชสถานะล็อกอินอัตโนมัติ
  const navigate = useNavigate();
  const user = getCurrentUser(); // ดึงข้อมูลผู้ใช้ปัจจุบัน (ถ้าล็อกอินอยู่จะได้ Object ผู้ใช้, ถ้าไม่ จะได้ null)

  function handleLogout() {
    logout(); // ลบ token และ user ออกจาก localStorage
    navigate("/login"); // พากลับไปหน้า Login
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="eyebrow">ENGSE203 • LAB 05</p>
          <p className="brand">Campus Service Request</p>
        </div>
        <nav aria-label="เมนูหลัก">
          {links.map(([to, label]) => (
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              end={to === "/"}
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
          {/* แสดงผลตามสถานะการเข้าสู่ระบบ */}
          {user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginLeft: "auto",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#eef4fb",
                  fontWeight: 600,
                }}
              >
                👤 {user.name} ({user.role})
              </span>
              <button
                type="button"
                className="button secondary"
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.85rem" }}
                onClick={handleLogout}
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              to="/login"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
