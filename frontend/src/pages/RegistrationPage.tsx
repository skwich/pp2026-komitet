import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import "../css/RegistrationPage.css";

type Role = "parent" | "treasurer";

function RegisterPage() {
  const [role, setRole] = useState<Role>("parent");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/home");
  }

  return (
    <div className="login-page">
        <h1 className="login-title">РЕГИСТРАЦИЯ</h1>
        <form className="login-card register-card" onSubmit={handleSubmit}>

            <div className="role-tabs">
            <button
                type="button"
                className={role === "parent" ? "role-tab role-tab-active" : "role-tab"}
                onClick={() => setRole("parent")}
            >
                Родитель
            </button>
            <button
                type="button"
                className={role === "treasurer" ? "role-tab role-tab-active" : "role-tab"}
                onClick={() => setRole("treasurer")}
            >
                Казначей
            </button>
            </div>

            <input
            className="login-input"
            type="text"
            placeholder="введите ФИО"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            />

            <input
            className="login-input"
            type="tel"
            placeholder="введите номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            />

            <input
            className="login-input"
            type="password"
            placeholder="придумайте пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            <button className="login-button" type="submit">
            Зарегистрироваться
            </button>

            <p className="login-footer">
            Уже есть аккаунт?
            <Link className="login-link" to="/login">
                Войти
            </Link>
            </p>
        </form>
    </div>
  );
}

export default RegisterPage;