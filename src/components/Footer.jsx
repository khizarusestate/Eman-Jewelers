import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Gem,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/923177348178";
const EASE = [0.16, 1, 0.3, 1];

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Our story", href: "/about" },
  { label: "Explore collection", href: "/#collections" },
  { label: "My account", href: "/account" },
];

export default function Footer() {
  const reduce = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: reduce ? 18 : 55 }, (_, i) => ({
        id: i,
        left: `${(i * 37.7) % 100}%`,
        top: `${(i * 61.3) % 100}%`,
        size: i % 9 === 0 ? 4 : i % 4 === 0 ? 3 : 1.5,
        duration: 5 + (i % 9) * 1.7,
        delay: (i % 13) * -0.7,
        x: ((i * 29) % 160) - 80,
        y: ((i * 43) % 180) - 90,
      })),
    [reduce]
  );

  return (
    <footer className="relative isolate overflow-hidden border-t border-[#D7B36B]/20 bg-[#050403] text-[#F8F3E8]">
      {/* Ambient gold atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft-focus signature jewel image, with a dark veil to keep footer copy readable */}
        <motion.div
          className="absolute -inset-6 scale-[1.04] bg-cover bg-center bg-no-repeat blur-[12px]"
          style={{
            backgroundImage: "url('/images/Home.png')",
            opacity: 0.28,
            mixBlendMode: "screen",
          }}
          animate={reduce ? {} : { scale: [1.04, 1.09, 1.04], opacity: [0.22, 0.31, 0.22] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(5,4,3,0.88)_0%,rgba(5,4,3,0.72)_48%,rgba(5,4,3,0.84)_100%)]" />
        <motion.div
          animate={reduce ? {} : { x: [0, 70, -30, 0], y: [0, -25, 30, 0], scale: [1, 1.12, 0.96, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 -top-48 h-[430px] w-[430px] rounded-full bg-[#D4A64E]/[0.10] blur-[115px]"
        />
        <motion.div
          animate={reduce ? {} : { x: [0, -45, 25, 0], y: [0, 25, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-52 -left-32 h-[390px] w-[390px] rounded-full bg-[#8B5E1B]/[0.12] blur-[110px]"
        />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.id % 5 === 0 ? "#FFF1B8" : p.id % 3 === 0 ? "#F1C965" : "#BB7B24",
              boxShadow: p.id % 5 === 0
                ? "0 0 7px 2px rgba(255,241,184,0.8), 0 0 20px 5px rgba(241,201,101,0.3)"
                : "0 0 8px 2px rgba(241,201,101,0.45), 0 0 18px rgba(187,123,36,0.2)",
            }}
            animate={reduce ? { opacity: 0.45 } : {
              x: [0, p.x * 0.55, p.x, 0],
              y: [0, p.y, p.y * 0.3, 0],
              opacity: [0.12, 0.95, 0.35, 0.8, 0.12],
              scale: [0.65, 1.35, 0.8, 1.15, 0.65],
            }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(241,201,101,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(241,201,101,.35)_1px,transparent_1px)] [background-size:68px_68px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F1C965]/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-16">
        {/* Signature invitation */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="grid gap-8 border-b border-[#D7B36B]/20 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:py-20"
        >
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.34em] text-[#D9B879] sm:text-[10px]">
            </div>
            <h2 className="font-serif text-[clamp(2.4rem,6vw,5.4rem)] font-normal leading-[0.95] tracking-[-0.055em]">
              Beauty that stays.
              <span className="mt-2 block italic text-[#E8C77D]">Memories that shine.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[12px] leading-7 text-[#B7AC98] sm:text-sm sm:leading-8">
              The right piece is never just an accessory. It becomes part of your story.
              Let us help you find one that feels like yours.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-[54px] w-fit items-center justify-between gap-8 border border-[#D7B36B]/55 bg-gradient-to-r from-[#F1C965]/[0.10] to-transparent px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F1D99C] transition-all duration-500 hover:border-[#F1C965] hover:bg-[#F1C965]/[0.14] hover:shadow-[0_0_35px_rgba(241,201,101,0.10)] sm:px-6"
          >
            <span className="flex items-center gap-3"><MessageCircle size={17} strokeWidth={1.4} /> Talk to our team</span>
            <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Footer directory */}
        <div className="grid gap-12 py-12 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr] lg:gap-16 lg:py-16">
          <div className="max-w-sm">
            <a href="/" aria-label="Eman Jewelers home" className="group inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D7B36B]/45 bg-[#F1C965]/[0.05] text-[#E8C77D] transition-all duration-500 group-hover:border-[#F1C965] group-hover:shadow-[0_0_25px_rgba(241,201,101,0.16)]">
                <img src="/images/Logo.png" alt="" className="h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-105" />
              </span>
              <span>
                <span className="block font-serif text-[25px] leading-none tracking-[-0.035em] text-[#F8F0E1]">Eman Jewelers</span>
                <span className="mt-2 block text-[8px] uppercase tracking-[0.29em] text-[#B78B42]">Fine jewellery · Thoughtfully chosen</span>
              </span>
            </a>
            <p className="mt-6 max-w-xs text-[12px] leading-7 text-[#A99C85]">
              Pieces for your milestones, your moments, and everything you want to remember.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-wide text-[#D9B879] transition-colors hover:text-[#FFF1B8]">
              <MessageCircle size={15} /> 0317 7348178 <ArrowUpRight size={12} />
            </a>
          </div>

          <div>
            <h3 className="mb-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.27em] text-[#E8C77D]">
              <span className="h-px w-5 bg-[#B78B42]" /> Discover
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="group inline-flex items-center gap-2 text-[12px] text-[#B7AC98] transition-colors duration-300 hover:text-[#F1D99C]">
                    <span className="h-px w-0 bg-[#D7B36B] transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.27em] text-[#E8C77D]">
              <span className="h-px w-5 bg-[#B78B42]" /> Your experience
            </h3>
            <ul className="space-y-4">
              <li><a href="/wishlist" className="group inline-flex items-center gap-3 text-[12px] text-[#B7AC98] transition-colors hover:text-[#F1D99C]"><Heart size={15} className="text-[#C99C50] transition-transform group-hover:scale-110" /> Saved favourites</a></li>
              <li><a href="/cart" className="group inline-flex items-center gap-3 text-[12px] text-[#B7AC98] transition-colors hover:text-[#F1D99C]"><Gem size={15} className="text-[#C99C50] transition-transform group-hover:scale-110" /> Shopping bag</a></li>
              <li className="flex items-start gap-3 text-[12px] leading-6 text-[#B7AC98]"><ShieldCheck size={15} className="mt-1 shrink-0 text-[#C99C50]" /> Thoughtful details, a personal touch.</li>
            </ul>
          </div>
        </div>

        {/* Closing signature */}
        <div className="flex flex-col gap-4 border-t border-[#D7B36B]/20 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] tracking-[0.08em] text-[#827765]">© {new Date().getFullYear()} Eman Jewelers. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[#A99C85]">
            <span className="h-px w-7 bg-gradient-to-r from-transparent to-[#B78B42]" />
            Crafted to be remembered
            <Gem size={12} className="text-[#D7B36B]" />
            <span className="h-px w-7 bg-gradient-to-l from-transparent to-[#B78B42]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
