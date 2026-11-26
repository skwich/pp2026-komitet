
import { apiRequest } from "./client";

export type Role = "parent" | "treasurer";

export interface User {
  id: number;
  phone: string;
  full_name: string;
}

export interface LoginData {
  phone: string;
  password: string;
}

export interface RegisterData {
  full_name: string;
  phone: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface RegisterResponse extends AuthResponse {
  registration_role: Role;
}

/**
 * Регистрация пользователя.
 */
export function registerUser(
  data: RegisterData
): Promise<RegisterResponse> {
  return apiRequest<RegisterResponse>(
    "/api/auth/register/",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

/**
 * Вход пользователя.
 */
export function loginUser(
  data: LoginData
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(
    "/api/auth/login/",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

/**
 * Получение информации о текущем пользователе.
 */
export function getCurrentUser(): Promise<{ user: User }> {
  return apiRequest<{ user: User }>(
    "/api/auth/me/"
  );
}

/**
 * Выход пользователя.
 */
export function logoutUser(): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(
    "/api/auth/logout/",
    {
      method: "POST",
    }
  );
}
