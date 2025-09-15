const BASE = import.meta.env.VITE_API_BASE || "";

export async function api(path, options = {}) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    // Try parse json error body for better message
    let msg = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body && (body.message || body.msg)) msg = body.message || body.msg;
      else if (typeof body === "string") msg = body;
    } catch (_e) {
      try {
        msg = await res.text();
      } catch (_e) {}
    }
    throw new Error(msg || `HTTP ${res.status}`);
  }

  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const Auth = {
  register: (data) => api("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => api("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  me: () => api("/auth/me"),
  logout: () => api("/auth/logout", { method: "POST" }),
};
