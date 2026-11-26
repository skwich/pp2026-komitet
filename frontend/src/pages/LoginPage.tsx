import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../shared/api/auth";

import "../css/LoginPage.css";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await loginUser({
        phone,
        password,
      });

      navigate("/home");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось выполнить вход.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
          autoComplete="tel"
          required
        />

        <input
          className="login-input"
          type="password"
          placeholder="введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button className="login-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Выполняется вход..." : "Войти"}
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
