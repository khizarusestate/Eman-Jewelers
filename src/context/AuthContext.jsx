import { createContext, useContext, useEffect, useMemo, useState } from "react";
const AuthContext = createContext(null);
export const API_URL = (import.meta.env.VITE_API_URL || "https://82-25-105-184.sslip.io").replace(/\/$/, "");
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/api/auth/me`, { credentials: "include" })
      .then(async r => { const data = await r.json(); if (!r.ok) throw new Error(data.message); return data; })
      .then(data => { if (active) setUser(data.user); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);
  const value = useMemo(() => ({
    user, setUser, checking, apiUrl: API_URL,
    async request(path, options = {}) {
      const response = await fetch(`${API_URL}${path}`, {
        ...options, credentials: "include",
        headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers }
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
      if (data.user) setUser(data.user);
      return data;
    },
    async logout() { const response = await fetch(`${API_URL}/api/auth/logout`, { method: "POST", credentials: "include" }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.message || "Unable to sign out."); setUser(null); return data; }
  }), [user, checking]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
};
