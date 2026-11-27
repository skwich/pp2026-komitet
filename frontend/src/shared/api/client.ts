
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");


function getCookie(name: string): string | null {
  const prefix = `${name}=`;

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(prefix));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(prefix.length));
}


async function initializeCsrf(): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/csrf/`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Не удалось получить CSRF-токен.");
  }
}


function getErrorMessage(data: unknown): string {
  if (typeof data === "string") {
    return data;
  }

  if (data && typeof data === "object") {
    const errors = data as Record<string, unknown>;

    if (typeof errors.detail === "string") {
      return errors.detail;
    }

    if (typeof errors.message === "string") {
      return errors.message;
    }

    return Object.entries(errors)
      .map(([field, value]) => {
        const message = Array.isArray(value)
          ? value.join(", ")
          : String(value);

        return `${field}: ${message}`;
      })
      .join("; ");
  }

  return "Произошла ошибка при обращении к серверу.";
}


export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();

  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (
    options.body &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  const unsafeMethods = ["POST", "PUT", "PATCH", "DELETE"];

  if (unsafeMethods.includes(method)) {
    let csrfToken = getCookie("csrftoken");

    if (!csrfToken) {
      await initializeCsrf();
      csrfToken = getCookie("csrftoken");
    }

    if (!csrfToken) {
      throw new Error("Не удалось получить CSRF-токен.");
    }

    headers.set("X-CSRFToken", csrfToken);
  }

  const response = await fetch(
    `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...options,
      method,
      headers,
      credentials: "include",
    }
  );

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data as T;
}
