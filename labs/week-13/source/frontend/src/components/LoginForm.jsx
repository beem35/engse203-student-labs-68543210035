import { useState } from "react";

const emptyForm = {
  email: "",
  password: "",
};

function validate(form) {
  const errors = {};
  if (!form.email.trim()) {
    errors.email = "กรุณากรอกอีเมล";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "รูปแบบอีเมลไม่ถูกต้อง";
  }
  if (!form.password) {
    errors.password = "กรุณากรอกรหัสผ่าน";
  }
  return errors;
}

function FieldError({ id, message }) {
  return (
    <small className="error" id={id}>
      {message ?? ""}
    </small>
  );
}

function LoginForm({ onLogin }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFeedback("กรุณาตรวจข้อมูลที่ระบุ");
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback("");
      await onLogin(form.email, form.password);
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "เข้าสู่ระบบไม่สำเร็จ",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="login-email">อีเมล</label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="error-email"
        />
        <FieldError id="error-email" message={errors.email} />
      </div>

      <div className="field">
        <label htmlFor="login-password">รหัสผ่าน</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          aria-invalid={Boolean(errors.password)}
          aria-describedby="error-password"
        />
        <FieldError id="error-password" message={errors.password} />
      </div>

      {feedback && (
        <p
          className="status error"
          role="alert"
          style={{ marginBottom: "1rem" }}
        >
          {feedback}
        </p>
      )}

      <button className="button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner" aria-hidden="true" />
            กำลังเข้าสู่ระบบ…
          </>
        ) : (
          "เข้าสู่ระบบ"
        )}
      </button>
    </form>
  );
}

export default LoginForm;