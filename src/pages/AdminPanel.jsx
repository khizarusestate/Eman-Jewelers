import { useState } from "react";
import { LockKeyhole, LogOut, ShieldCheck } from "lucide-react";

const ADMIN_EMAIL = "admin123@gmail.com";
const ADMIN_PASSWORD = "admin123";
const SESSION_KEY = "eman-jewelers-admin-auth";

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === "true"; } catch { return false; }
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Invalid email or password.");
      return;
    }
    try { sessionStorage.setItem(SESSION_KEY, "true"); } catch {}
    setAuthenticated(true);
    setError("");
  }

  function handleLogout() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch {}
    setAuthenticated(false);
    setEmail("");
    setPassword("");
  }

  return (
    <main className="min-h-screen bg-[#0c0a08] text-[#f7f0e3] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/Logo.png" alt="Eman Jewelers" className="h-24 w-24 object-contain mx-auto mb-5" />
          <p className="text-[10px] tracking-[0.42em] uppercase text-[#c8a96b]">Eman Jewelers</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-light tracking-wide">{authenticated ? "Admin Dashboard" : "Admin Login"}</h1>
          <p className="mt-3 text-sm text-[#a9a095]">{authenticated ? "Your store management area" : "Sign in to manage your store"}</p>
        </div>

        {!authenticated ? (
          <form onSubmit={handleLogin} className="rounded-2xl border border-[#b89450]/30 bg-[#15110d] p-7 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-3 mb-7">
              <span className="grid place-items-center h-10 w-10 rounded-full border border-[#c8a96b]/40 text-[#d9bd7b]"><LockKeyhole size={18} /></span>
              <div>
                <h2 className="text-lg">Administrator access</h2>
                <p className="text-xs text-[#9c9284] mt-1">Authorized personnel only</p>
              </div>
            </div>
            <label htmlFor="admin-email" className="block text-xs tracking-wider text-[#d2c5b0] mb-2">EMAIL ADDRESS</label>
            <input id="admin-email" type="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} required className="w-full rounded-lg border border-[#6f5a36]/60 bg-[#0d0b09] px-4 py-3 text-sm text-white outline-none transition focus:border-[#d2ad63] mb-5" placeholder="Enter admin email" />
            <label htmlFor="admin-password" className="block text-xs tracking-wider text-[#d2c5b0] mb-2">PASSWORD</label>
            <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required className="w-full rounded-lg border border-[#6f5a36]/60 bg-[#0d0b09] px-4 py-3 text-sm text-white outline-none transition focus:border-[#d2ad63]" placeholder="Enter password" />
            {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}
            <button type="submit" className="mt-7 w-full rounded-lg bg-gradient-to-r from-[#e4c77f] via-[#c6a15a] to-[#a77a37] px-5 py-3.5 text-sm font-semibold tracking-[0.12em] text-[#171108] transition hover:brightness-110">Login</button>
          </form>
        ) : (
          <section className="rounded-2xl border border-[#b89450]/30 bg-[#15110d] p-7 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-3 mb-5 text-[#d9bd7b]"><ShieldCheck size={22} /><h2 className="text-lg text-[#f7f0e3]">You're signed in</h2></div>
            <p className="text-sm leading-6 text-[#b8ad9d]">Admin login is ready. Product, order, and inventory management sections can be connected here next.</p>
            <button onClick={handleLogout} className="mt-7 inline-flex items-center gap-2 rounded-lg border border-[#c8a96b]/40 px-4 py-2.5 text-sm text-[#e5d4b1] transition hover:bg-[#c8a96b]/10"><LogOut size={16} /> Log out</button>
          </section>
        )}
        <p className="mt-6 text-center text-[11px] leading-5 text-[#776e61]">Eman Jewelers · Secure admin area</p>
      </div>
    </main>
  );
}
