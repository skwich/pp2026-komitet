import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/home");
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">ВХОД</h1>

        <input
          className="login-input"
          type="tel"
          placeholder="введите номер телефона"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit">
          Войти
        </button>

        <p className="login-footer">
          Нет аккаунта?
          <Link className="login-link" to="/registration">
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;