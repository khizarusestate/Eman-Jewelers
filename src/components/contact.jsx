import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Gem, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923177348178";

export default function Contact() {
    const [form, setForm] = useState({ name: "", phone: "", message: "" });
    const reduce = useReducedMotion();

    const update = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const submit = (event) => {
        event.preventDefault();
        const text = [
            "Hello Eman Jewelers,",
            "",
            "I would like to make an enquiry.",
            "",
            `Name: ${form.name.trim()}`,
            `Phone: ${form.phone.trim()}`,
            "",
            "Message:",
            form.message.trim(),
        ].join("\n");

        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    const inputClass =
        "w-full rounded-sm border border-[#BB7B24]/25 bg-[#100D08]/75 px-4 py-4 text-sm text-[#FFF9EA] outline-none transition-all duration-300 placeholder:text-[#8E806B] hover:border-[#BB7B24]/50 focus:border-[#F1C965]/75 focus:ring-1 focus:ring-[#F1C965]/20";

    return (
        <section id="contact" className="relative isolate overflow-hidden bg-[#080705] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#A76A16]/10 blur-[110px]" />
                <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#F1C965]/[0.07] blur-[120px]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#BB7B24]/45 to-transparent" />
            </div>

            <div className="mx-auto grid max-w-[1250px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#CD9135]">
                        <Gem size={15} strokeWidth={1.3} />
                        Get in touch
                    </div>
                    <h2 className="max-w-xl font-serif text-5xl font-normal leading-[1.05] tracking-[-0.035em] text-[#FFF9EA] sm:text-6xl lg:text-7xl">
                        Let’s create something <span className="italic text-[#F1C965]">timeless.</span>
                    </h2>
                    <p className="mt-7 max-w-md text-sm leading-8 text-[#A99A83] sm:text-base">
                        Have a question or looking for something special? Send us a message.
                        Our team will be happy to assist you.
                    </p>
                    <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-9 inline-flex items-center gap-3 text-sm text-[#F1C965] transition-colors hover:text-[#FFF1B8]"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#BB7B24]/40 bg-[#F1C965]/[0.06]">
                            <MessageCircle size={19} />
                        </span>
                        <span>
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A99A83]">WhatsApp us</span>
                            <span className="mt-1 block tracking-wide">0317 7348178</span>
                        </span>
                        <ArrowUpRight size={16} className="ml-1" />
                    </a>
                </motion.div>

                <motion.form
                    onSubmit={submit}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.12 }}
                    className="relative border border-[#BB7B24]/25 bg-[#0D0A06]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-9"
                >
                    <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#F1C965]/70 to-transparent" />
                    <div className="mb-8">
                        <p className="font-serif text-2xl text-[#FFF9EA]">Send us a message</p>
                        <p className="mt-2 text-xs tracking-wide text-[#A99A83]">We’ll connect with you on WhatsApp.</p>
                    </div>

                    <div className="space-y-5">
                        <label className="block">
                            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#CD9135]">Your name</span>
                            <input
                                className={inputClass}
                                type="text"
                                name="name"
                                autoComplete="name"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={update}
                                required
                                maxLength={80}
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#CD9135]">Phone number</span>
                            <input
                                className={inputClass}
                                type="tel"
                                name="phone"
                                autoComplete="tel"
                                inputMode="tel"
                                placeholder="03XX XXXXXXX"
                                value={form.phone}
                                onChange={update}
                                required
                                maxLength={25}
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#CD9135]">Your message</span>
                            <textarea
                                className={`${inputClass} min-h-[145px] resize-y`}
                                name="message"
                                placeholder="How can we help you?"
                                value={form.message}
                                onChange={update}
                                required
                                maxLength={1500}
                                rows={5}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="group mt-7 inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-sm bg-gradient-to-r from-[#BB7B24] via-[#F1C965] to-[#CD9135] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#160F04] shadow-[0_0_25px_rgba(187,123,36,0.16)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(241,201,101,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1C965]"
                    >
                        Send via WhatsApp
                        <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                    <p className="mt-4 text-center text-[10px] leading-5 text-[#8E806B]">
                        Your message will open in WhatsApp for you to review and send.
                    </p>
                </motion.form>
            </div>
        </section>
    );
}
