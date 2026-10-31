import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gem, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";
export default function AuthPage({ mode = "login" }) {
  const isRegister = mode === "register";
  const { request } = useAuth(); const toast = useToast(); const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", phone: "", address: "", city: "", country: "Pakistan" });
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault(); setBusy(true);
    try {
      await request(`/api/auth/${isRegister ? "register" : "login"}`, { method: "POST", body: JSON.stringify(form) });
      toast(isRegister ? "Your account has been created. Welcome to Eman Jewelers." : "Welcome back. You are now signed in.", "success");
      navigate("/account");
    } catch (error) { toast(error.message, "error"); } finally { setBusy(false); }
  };
  const field = (name, label, type = "text", required = false) => <label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[.2em] text-[#C7A76A]">{label}</span><input name={name} type={type} required={required} value={form[name]} onChange={change} autoComplete={name === "password" ? (isRegister ? "new-password" : "current-password") : name === "email" ? "email" : "on"} className="w-full rounded-xl border border-[#B98536]/25 bg-black/30 px-4 py-3.5 text-sm text-[#FFF4D9] outline-none transition focus:border-[#E8C46F]/70 focus:ring-2 focus:ring-[#E8C46F]/10" /></label>;
  return <main className="min-h-screen bg-[#080705] px-5 pb-20 pt-32 text-[#FFF4D9]"><div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-[#B98536]/25 bg-[#100D08] shadow-[0_25px_90px_rgba(0,0,0,.45)] lg:grid-cols-[.8fr_1.2fr]">
    <aside className="relative hidden min-h-full flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,rgba(187,123,36,.2),transparent_65%)] p-10 lg:flex"><Link to="/" className="flex items-center gap-2 text-xs uppercase tracking-[.2em] text-[#E7C778]"><ArrowLeft size={15}/> Back to store</Link><div><Gem size={34} className="mb-6 text-[#F1C965]"/><p className="mb-3 text-[10px] uppercase tracking-[.3em] text-[#BB8B3B]">Eman Jewelers</p><h1 className="font-serif text-5xl leading-tight">{isRegister ? "A little more personal." : "Welcome to timeless elegance."}</h1><p className="mt-5 max-w-xs text-sm leading-7 text-[#B9AA91]">Your private space for a more personal jewellery experience.</p></div><span className="text-[10px] tracking-[.2em] text-[#8E7957]">CRAFTED WITH CARE</span></aside>
    <section className="p-6 sm:p-10 lg:p-12"><Link to="/" className="mb-9 inline-flex items-center gap-2 text-xs text-[#BBA77F] lg:hidden"><ArrowLeft size={15}/> Back to store</Link><div className="mb-8"><Gem className="mb-4 text-[#F1C965]" size={26}/><p className="text-[10px] uppercase tracking-[.28em] text-[#BB8B3B]">{isRegister ? "Create your account" : "Member access"}</p><h2 className="mt-2 font-serif text-4xl">{isRegister ? "Join Eman Jewelers" : "Sign in"}</h2><p className="mt-3 text-sm text-[#B9AA91]">{isRegister ? "Create an account to manage your details and future orders." : "Enter your details to access your account."}</p></div>
      <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">{isRegister && <>{field("name","Full name","text",true)}{field("phone","Phone number")}</>}{field("email","Email address","email",true)}<label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[.2em] text-[#C7A76A]">Password</span><span className="relative block"><input name="password" type={showPassword ? "text" : "password"} minLength={8} required value={form.password} onChange={change} className="w-full rounded-xl border border-[#B98536]/25 bg-black/30 px-4 py-3.5 pr-12 text-sm text-[#FFF4D9] outline-none focus:border-[#E8C46F]/70"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BBA77F]">{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></span></label>{isRegister && <>{field("confirmPassword","Confirm password","password",true)}{field("address","Delivery address")}{field("city","City")}{field("country","Country")}</>}
      <button disabled={busy} className="mt-2 rounded-xl bg-gradient-to-r from-[#B98536] via-[#F1C965] to-[#C18A36] px-6 py-4 text-[11px] font-bold uppercase tracking-[.2em] text-[#1A1005] transition hover:brightness-110 disabled:opacity-60 sm:col-span-2">{busy ? "Please wait..." : isRegister ? "Create account" : "Sign in securely"}</button></form>
      <p className="mt-7 text-center text-sm text-[#B9AA91]">{isRegister ? "Already have an account?" : "New to Eman Jewelers?"} <Link className="ml-1 text-[#F1C965] hover:underline" to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p>
    </section></div></main>;
}
