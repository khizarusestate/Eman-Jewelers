import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";

export default function AuthPage({ mode = "login" }) {
  const isRegister = mode === "register";
  const { request } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", phone: "", address: "", city: "", country: "Pakistan" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (isRegister && form.password !== form.confirmPassword) {
      toast("Your passwords do not match.", "error");
      return;
    }
    setBusy(true);
    try {
      await request(`/api/auth/${isRegister ? "register" : "login"}`, { method: "POST", body: JSON.stringify(form) });
      toast(isRegister ? "Your account has been created. Welcome to Eman Jewelers." : "Welcome back. You are now signed in.", "success");
      window.history.pushState({}, "", "/account");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const field = (name, label, type = "text", required = false, span = "") => (
    <label className={`group block ${span}`}>
      <span className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[.24em] text-[#B18A4A]">
        {label}
        {required && <span className="text-[#80643B]">Required</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        value={form[name]}
        onChange={change}
        autoComplete={name === "password" ? (isRegister ? "new-password" : "current-password") : name === "email" ? "email" : name === "phone" ? "tel" : name}
        placeholder={name === "country" ? "Pakistan" : ""}
        className="w-full border-0 border-b border-[#8E744B]/35 bg-transparent px-0 py-3 text-[14px] tracking-wide text-[#F8F0E1] outline-none transition placeholder:text-[#786D5C] focus:border-[#E5BF75] focus:ring-0"
      />
    </label>
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090806] px-4 pb-16 pt-28 text-[#F8F0E1] sm:px-6 sm:pt-32">
      <div className="pointer-events-none absolute -left-40 top-24 h-[460px] w-[460px] rounded-full bg-[#9D6B25]/[0.09] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C39A52]/[0.06] blur-[150px]" />
      <div className="relative mx-auto grid max-w-[1100px] overflow-hidden border border-[#A77C3D]/30 bg-[#100E0A] shadow-[0_35px_120px_rgba(0,0,0,.55)] lg:min-h-[700px] lg:grid-cols-[.82fr_1.18fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-[#A77C3D]/20 bg-[radial-gradient(ellipse_at_45%_45%,rgba(177,125,48,.17),transparent_60%)] p-11 lg:flex xl:p-14">
          <a href="/" className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[.24em] text-[#C8A66D] transition hover:text-[#F3D99F]">
            <ArrowLeft size={14} strokeWidth={1.5} /> Return to collection
          </a>
          <div className="relative">
            <span className="mb-6 block h-px w-12 bg-[#C39A52]" />
            <p className="mb-5 text-[9px] uppercase tracking-[.38em] text-[#B18A4A]">The Eman experience</p>
            <h1 className="max-w-sm font-serif text-[54px] font-normal leading-[1.08] tracking-[-.035em] text-[#F8F0E1]">
              {isRegister ? <>A world of<br /><i className="font-normal text-[#D8B879]">personal elegance.</i></> : <>Elegance,<br /><i className="font-normal text-[#D8B879]">remembered.</i></>}
            </h1>
            <p className="mt-7 max-w-[270px] text-[12px] leading-7 tracking-[.04em] text-[#A99C85]">
              {isRegister ? "Create your private account and keep your Eman Jewelers experience close." : "Your personal space for a considered and effortless jewellery experience."}
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-[#A77C3D]/25 pt-5 text-[8px] uppercase tracking-[.28em] text-[#8D7958]">
            <span>EMAN JEWELERS</span><span>EST. WITH CARE</span>
          </div>
          <span className="pointer-events-none absolute -bottom-24 -right-20 font-serif text-[280px] leading-none text-[#C39A52]/[0.035]">E</span>
        </aside>

        <section className="relative px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <a href="/" className="mb-10 inline-flex items-center gap-2 text-[9px] uppercase tracking-[.2em] text-[#BDA77F] lg:hidden">
            <ArrowLeft size={14} /> Back to store
          </a>
          <div className="mb-9 max-w-lg">
            <p className="mb-3 text-[9px] uppercase tracking-[.34em] text-[#B18A4A]">{isRegister ? "Your membership begins here" : "A personal welcome"}</p>
            <h2 className="font-serif text-[38px] font-normal leading-tight tracking-[-.025em] text-[#F8F0E1] sm:text-[46px]">
              {isRegister ? "Create an account" : "Welcome back"}
            </h2>
            <p className="mt-3 text-[12px] leading-6 text-[#9F927D]">
              {isRegister ? "A few details are all we need to get started." : "Sign in to continue to your personal account."}
            </p>
          </div>

          <form onSubmit={submit} className="grid gap-x-9 gap-y-7 sm:grid-cols-2">
            {isRegister && <>{field("name", "Full name", "text", true)}{field("phone", "Phone number")}</>}
            {field("email", "Email address", "email", true, isRegister ? "" : "sm:col-span-2")}
            <label className={`group block ${isRegister ? "" : "sm:col-span-2"}`}>
              <span className="mb-2 block text-[9px] uppercase tracking-[.24em] text-[#B18A4A]">Password</span>
              <span className="relative block">
                <input name="password" type={showPassword ? "text" : "password"} minLength={8} required value={form.password} onChange={change} autoComplete={isRegister ? "new-password" : "current-password"} className="w-full border-0 border-b border-[#8E744B]/35 bg-transparent px-0 py-3 pr-10 text-[14px] tracking-wide text-[#F8F0E1] outline-none transition placeholder:text-[#786D5C] focus:border-[#E5BF75] focus:ring-0" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#A9936D] transition hover:text-[#F1D28E]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
              </span>
            </label>
            {isRegister && <>{field("confirmPassword", "Confirm password", "password", true)}{field("address", "Delivery address")}{field("city", "City")}{field("country", "Country")}</>}
            <button disabled={busy} className="group mt-3 flex min-h-[58px] items-center justify-between border border-[#C39A52]/65 bg-[#C39A52] px-6 text-[10px] font-semibold uppercase tracking-[.24em] text-[#171006] transition duration-300 hover:bg-[#E2C17F] disabled:cursor-wait disabled:opacity-60 sm:col-span-2">
              <span>{busy ? "Please wait..." : isRegister ? "Create your account" : "Sign in to your account"}</span>
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-[#A77C3D]/20 pt-6 text-[11px] text-[#9F927D]">
            <span>{isRegister ? "Already a member?" : "New to Eman Jewelers?"}</span>
            <a className="inline-flex items-center gap-2 text-[#D9B879] transition hover:text-[#F6DFA8]" href={isRegister ? "/login" : "/register"}>
              {isRegister ? "Sign in" : "Create an account"} <ArrowUpRight size={13} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
