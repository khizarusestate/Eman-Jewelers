import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "923177348178";

export default function Contact({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => { if (event.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const text = [
      "Hello Eman Jewelers,", "",
      "I would like to make an enquiry.", "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`, "",
      "Message:", form.message.trim(),
    ].join("\\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const fieldClass = "w-full border-0 border-b border-[#806D4D]/35 bg-transparent px-0 py-3.5 text-[13px] tracking-wide text-[#211A10] outline-none transition placeholder:text-[#A79A84] focus:border-[#A77A35] focus:ring-0";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[#050403]/85 px-3 py-5 backdrop-blur-lg sm:px-6 sm:py-8"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose?.(); }}
      role="presentation"
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        initial={reduce ? false : { opacity: 0, y: 22, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.985 }}
        transition={{ duration: 0.35 }}
        className="relative my-auto w-full max-w-[1040px] overflow-hidden border border-[#A77C3D]/45 bg-[#0B0906] text-white shadow-[0_35px_120px_rgba(0,0,0,.7)]"
      >
        <button type="button" onClick={onClose} aria-label="Close contact form" className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-[#B18A4A]/40 text-[#D9B879] transition hover:bg-[#C39A52]/15 sm:right-6 sm:top-6">
          <X size={18} strokeWidth={1.4} />
        </button>

        <div className="grid lg:min-h-[650px] lg:grid-cols-[.88fr_1.12fr]">
          <div className="relative flex flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_45%_45%,rgba(177,125,48,.18),transparent_65%)] px-7 pb-9 pt-12 sm:px-11 sm:pb-12 sm:pt-16 lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute -bottom-28 -left-20 font-serif text-[300px] leading-none text-[#C39A52]/[0.045]">E</div>
            <div className="relative">
              <div className="mb-9 flex items-center gap-3 text-[9px] uppercase tracking-[.34em] text-[#C49A55]">
                <span className="h-px w-8 bg-[#C49A55]" /> Private client enquiries
              </div>
              <h2 id="contact-title" className="max-w-md font-serif text-[42px] font-normal leading-[1.08] tracking-[-.035em] text-[#F8F0E1] sm:text-[54px]">
                A conversation<br />begins with <i className="font-normal text-[#D8B879]">you.</i>
              </h2>
              <p className="mt-7 max-w-[330px] text-[12px] leading-7 tracking-[.035em] text-[#A99C85]">
                Tell us what you have in mind. For a special piece, a question, or a little guidance, we are here to help.
              </p>
            </div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="relative mt-10 inline-flex w-fit items-center gap-4 border-t border-[#A77C3D]/35 pt-5 text-[#D9B879] transition hover:text-[#F5DDA6]">
              <span className="flex h-11 w-11 items-center justify-center border border-[#B18A4A]/45"><MessageCircle size={17} strokeWidth={1.4} /></span>
              <span><span className="block text-[8px] uppercase tracking-[.25em] text-[#A99C85]">Prefer WhatsApp?</span><span className="mt-1 block text-[12px] tracking-[.08em]">0317 7348178</span></span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="bg-[#F1EBDD] px-6 py-9 text-[#211A10] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <div className="mb-9 border-b border-[#806D4D]/25 pb-6">
              <p className="mb-2 text-[8px] uppercase tracking-[.3em] text-[#9B743A]">Eman Jewelers · Correspondence</p>
              <h3 className="font-serif text-[30px] font-normal tracking-[-.02em] text-[#211A10]">Send an enquiry</h3>
              <p className="mt-2 text-[11px] leading-6 text-[#887D69]">Complete the details below and continue securely in WhatsApp.</p>
            </div>

            <motion.form
              onSubmit={submit}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="relative"
            >
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[8px] uppercase tracking-[.23em] text-[#9B743A]">01 / Your name</span>
                  <input className={fieldClass} type="text" name="name" autoComplete="name" placeholder="Full name" value={form.name} onChange={update} required maxLength={80} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[8px] uppercase tracking-[.23em] text-[#9B743A]">02 / Phone number</span>
                  <input className={fieldClass} type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="03XX XXXXXXX" value={form.phone} onChange={update} required maxLength={25} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-[8px] uppercase tracking-[.23em] text-[#9B743A]">03 / Your message</span>
                  <textarea className={`${fieldClass} min-h-[126px] resize-y`} name="message" placeholder="How may we assist you?" value={form.message} onChange={update} required maxLength={1500} rows={4} />
                </label>
              </div>

              <button type="submit" className="group mt-9 flex min-h-[56px] w-full items-center justify-between bg-[#211A10] px-6 text-[9px] font-semibold uppercase tracking-[.24em] text-[#E8CC91] transition duration-300 hover:bg-[#3A2B17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A77A35]">
                <span>Continue to WhatsApp</span>
                <span className="flex items-center gap-3"><span className="hidden text-[8px] font-normal tracking-[.16em] text-[#B8A47E] sm:inline">REVIEW & SEND</span><ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
              </button>
              <p className="mt-4 text-center text-[9px] leading-5 tracking-[.03em] text-[#887D69]">Your message opens in WhatsApp, where you can review it before sending.</p>
            </motion.form>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
