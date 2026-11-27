import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser, type Role } from "../shared/api/auth";

import "../css/LoginPage.css";
import "../css/RegistrationPage.css";

function RegisterPage() {
  const [role, setRole] = useState<Role>("parent");

  const [fullName, setFullName] = useState("");
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
      await registerUser({
        role,
        full_name: fullName,
        phone,
        password,
      });

      // После регистрации сервер автоматически авторизует пользователя.
      navigate("/home");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось зарегистрироваться.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <h1 className="login-title">РЕГИСТРАЦИЯ</h1>

      <form className="login-card register-card" onSubmit={handleSubmit}>
        <div className="role-tabs">
          <button
            type="button"
            className={
              role === "parent" ? "role-tab role-tab-active" : "role-tab"
            }
            onClick={() => setRole("parent")}
          >
            Родитель
          </button>

          <button
            type="button"
            className={
              role === "treasurer" ? "role-tab role-tab-active" : "role-tab"
            }
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
          autoComplete="name"
          required
        />

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
          placeholder="придумайте пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button className="login-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
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
