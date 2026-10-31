import { useMemo, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
    useReducedMotion,
} from "framer-motion";
import {
    ArrowDown,
    ArrowRight,
    Sparkles,
    Gem,
    ShieldCheck,
    Crown,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

/* Signature image with graceful fallback if Home.png fails to load */
function Jewel() {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <Gem
                strokeWidth={0.8}
                className="relative z-10 h-1/2 w-1/2 text-[#F1C965] drop-shadow-[0_0_24px_rgba(241,201,101,0.5)]"
            />
        );
    }

    return (
        <motion.img
            src="./images/Home.png"
            alt="Eman Jewelers signature diamond"
            onError={() => setFailed(true)}
            className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_24px_rgba(241,201,101,0.4)]"
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: [0, -7, 0, 5, 0], scale: [1, 1.015, 1] }}
            transition={{
                opacity: { duration: 1.2, ease: "easeOut" },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
        />
    );
}

export default function Home() {
    const ref = useRef(null);
    const reduce = useReducedMotion();

    /* ---------- Cursor-driven depth ---------- */
    const px = useMotionValue(-500);
    const py = useMotionValue(-500);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const sx = useSpring(mx, { stiffness: 55, damping: 18 });
    const sy = useSpring(my, { stiffness: 55, damping: 18 });

    const medX = useTransform(sx, [-1, 1], [-22, 22]);
    const medY = useTransform(sy, [-1, 1], [-18, 18]);
    const glowX = useTransform(sx, [-1, 1], [30, -30]);
    const glowY = useTransform(sy, [-1, 1], [24, -24]);
    const chipX = useTransform(sx, [-1, 1], [-38, 38]);
    const chipY = useTransform(sy, [-1, 1], [-28, 28]);

    const spotlight = useMotionTemplate`radial-gradient(520px circle at ${px}px ${py}px, rgba(241,201,101,0.075), transparent 65%)`;

    const handleMove = (e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        px.set(x);
        py.set(y);
        mx.set((x / r.width) * 2 - 1);
        my.set((y / r.height) * 2 - 1);
    };

    const handleLeave = () => {
        mx.set(0);
        my.set(0);
        px.set(-500);
        py.set(-500);
    };

    /* ---------- Gold dust ---------- */
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

    const sparkles = [
        { x: "16%", y: "24%", delay: 0, size: 19 },
        { x: "84%", y: "30%", delay: 1.2, size: 13 },
        { x: "22%", y: "78%", delay: 0.7, size: 13 },
        { x: "78%", y: "76%", delay: 1.8, size: 13 },
        { x: "50%", y: "4%", delay: 0.5, size: 13 },
    ];

    const grain =
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

    return (
        <>
        <main
            ref={ref}
            id="home"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative h-[calc(88vh+75px)] min-h-[calc(620px+75px)] w-full overflow-hidden bg-[#050403] text-white selection:bg-[#F1C965] selection:text-black"
        >
            {/* ================= Atmosphere ================= */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Blurred Home.png atmosphere, matching the footer background */}
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
                <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0">
                    <motion.div
                        animate={{ x: [0, 65, -30, 0], y: [0, -35, 25, 0], scale: [1, 1.18, 0.94, 1] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-[16%] top-[6%] h-[400px] w-[400px] rounded-full bg-[#A76A16]/[0.13] blur-[120px]"
                    />
                    <motion.div
                        animate={{ x: [0, -55, 35, 0], y: [0, 45, -25, 0], scale: [1, 1.2, 0.9, 1] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-[4%] top-[22%] h-[360px] w-[360px] rounded-full bg-[#F1C965]/[0.10] blur-[110px]"
                    />
                </motion.div>

                <motion.div
                    animate={{ opacity: [0.08, 0.24, 0.08] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-25%] left-[25%] h-[400px] w-[600px] rounded-full bg-[#BB7B24]/[0.13] blur-[130px]"
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
                            background:
                                p.id % 5 === 0 ? "#FFF1B8" : p.id % 3 === 0 ? "#F1C965" : "#BB7B24",
                            boxShadow:
                                p.id % 5 === 0
                                    ? "0 0 7px 2px rgba(255,241,184,0.8), 0 0 20px 5px rgba(241,201,101,0.3)"
                                    : "0 0 8px 2px rgba(241,201,101,0.45), 0 0 18px rgba(187,123,36,0.2)",
                        }}
                        animate={
                            reduce
                                ? { opacity: 0.45 }
                                : {
                                      x: [0, p.x * 0.55, p.x, 0],
                                      y: [0, p.y, p.y * 0.3, 0],
                                      opacity: [0.12, 0.95, 0.35, 0.8, 0.12],
                                      scale: [0.65, 1.35, 0.8, 1.15, 0.65],
                                  }
                        }
                        transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}

                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(241,201,101,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(241,201,101,0.08) 1px, transparent 1px)",
                        backgroundSize: "100px 100px",
                        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
                    }}
                />

                <motion.div className="absolute inset-0 hidden lg:block" style={{ background: spotlight }} />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,4,3,0.4)_65%,#050403_100%)]" />

                <div
                    className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
                    style={{ backgroundImage: grain }}
                />

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#BB7B24]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#BB7B24]/55 to-transparent" />
            </div>

 

            {/* ================= Hero ================= */}
            <section className="relative z-10 mx-auto flex h-full max-w-[1450px] items-center px-6 pb-[7vh] pt-[calc(3vh+75px)] sm:px-10 lg:px-16">
                <div className="grid w-full items-center gap-[4vh] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">

                    {/* ---------- Copy ---------- */}
                    <div className="relative z-10 mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">

                        {/* Compact jewel for small screens */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: EASE }}
                            className="relative mx-auto mb-[2vh] flex aspect-square items-center justify-center lg:hidden"
                            style={{ width: "min(22vh, 190px)" }}
                        >
                            <div className="absolute inset-[10%] rounded-full bg-[#F1C965]/20 blur-[40px]" />
                            <Jewel />
                        </motion.div>

                        <h1
                            className="font-serif font-normal leading-[0.92] tracking-[-0.05em]"
                            style={{ fontSize: "clamp(2.7rem, min(7.4vw, 12.5vh), 6.8rem)" }}
                        >
                            <span className="block overflow-hidden pb-[0.06em]">
                                <motion.span
                                    initial={{ y: "115%", rotate: 2 }}
                                    animate={{ y: 0, rotate: 0 }}
                                    transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
                                    className="block origin-left text-[#FFF9EA]"
                                >
                                    Timeless
                                </motion.span>
                            </span>

                            <span className="mt-[0.12em] block overflow-hidden pb-[0.1em]">
                                <motion.span
                                    initial={{ y: "115%", rotate: 2, backgroundPosition: "0% 50%" }}
                                    animate={{ y: 0, rotate: 0, backgroundPosition: ["0% 50%", "200% 50%"] }}
                                    transition={{
                                        y: { duration: 1.2, delay: 0.28, ease: EASE },
                                        rotate: { duration: 1.2, delay: 0.28, ease: EASE },
                                        backgroundPosition: { duration: 7, delay: 1.4, repeat: Infinity, ease: "linear" },
                                    }}
                                    className="block origin-left bg-clip-text italic text-transparent"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(100deg,#BB7B24 0%,#F1C965 25%,#FFF6D0 50%,#F1C965 75%,#BB7B24 100%)",
                                        backgroundSize: "200% 100%",
                                        WebkitBackgroundClip: "text",
                                    }}
                                >
                                    Radiance.
                                </motion.span>
                            </span>
                        </h1>

                        {/* Separator */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
                            className="mx-auto my-[3.2vh] flex max-w-[280px] origin-center items-center gap-4 lg:mx-0 lg:origin-left"
                        >
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#BB7B24]" />
                            <Gem
                                size={17}
                                strokeWidth={1.3}
                                className="shrink-0 text-[#F1C965] drop-shadow-[0_0_10px_rgba(241,201,101,0.8)]"
                            />
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#BB7B24]" />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 0.8, ease: EASE }}
                            className="mx-auto max-w-[30rem] text-sm leading-[1.9] text-[#B8ADA0] sm:text-[0.95rem] lg:mx-0"
                        >
                            Discover jewellery that captures the extraordinary. Timeless
                            elegance, exquisite details, and a golden touch crafted for
                            your most unforgettable moments.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 1, ease: EASE }}
                            className="mt-[4vh] flex flex-wrap items-center justify-center gap-4 sm:gap-5 lg:justify-start"
                        >
                            <motion.a
                                href="#collections"
                                whileHover={{ scale: 1.045, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative inline-flex min-h-[52px] items-center justify-center gap-3 overflow-hidden rounded-sm bg-gradient-to-r from-[#BB7B24] via-[#F1C965] to-[#CD9135] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#160F04] shadow-[0_0_25px_rgba(187,123,36,0.18)] transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(241,201,101,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1C965] sm:px-8"
                            >
                                <motion.span
                                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/45 blur-md"
                                    animate={{ left: ["-50%", "150%"] }}
                                    transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
                                />
                                <span className="relative">Explore Collection</span>
                                <ArrowRight
                                    size={16}
                                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </motion.a>

                            <motion.a
                                href="/about"
                                whileHover={{ scale: 1.035, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative inline-flex min-h-[52px] items-center justify-center gap-3 rounded-sm border border-[#BB7B24]/45 bg-white/[0.015] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#F1C965] backdrop-blur-sm transition-all duration-500 hover:border-[#F1C965]/80 hover:bg-[#F1C965]/[0.07] hover:shadow-[0_0_30px_rgba(241,201,101,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1C965] sm:px-8"
                            >
                                Our Story
                                <ArrowRight
                                    size={15}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </motion.a>
                        </motion.div>

                        {/* Trust */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, delay: 1.25 }}
                            className="mt-[4.5vh] flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.14em] text-[#A99A83] sm:gap-x-8 lg:justify-start"
                        >
                            <span className="flex items-center gap-2">
                                <ShieldCheck size={15} className="text-[#CD9135]" />
                                Quality &amp; Craftsmanship
                            </span>
                            <span className="hidden h-4 w-px bg-[#BB7B24]/40 sm:block" />
                            <span className="flex items-center gap-2">
                                <Crown size={15} className="text-[#CD9135]" />
                                Timeless Design
                            </span>
                        </motion.div>
                    </div>

                    {/* ---------- Signature visual ---------- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.5, delay: 0.25, ease: EASE }}
                        className="relative mx-auto hidden aspect-square items-center justify-center lg:flex"
                        style={{ width: "min(100%, 66vh)" }}
                    >
                        {[
                            "left-0 top-0 border-l border-t",
                            "right-0 top-0 border-r border-t",
                            "bottom-0 left-0 border-b border-l",
                            "bottom-0 right-0 border-b border-r",
                        ].map((c, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 + i * 0.12, duration: 0.9 }}
                                className={`absolute h-7 w-7 border-[#BB7B24]/55 ${c}`}
                            />
                        ))}

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[4%] rounded-full border border-dashed border-[#BB7B24]/25"
                        />

                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[12%] rounded-full border border-[#F1C965]/20"
                        >
                            <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-[#FFF1B8] shadow-[0_0_15px_5px_rgba(241,201,101,0.45)]" />
                            <span className="absolute bottom-[14%] right-[7%] h-1.5 w-1.5 rounded-full bg-[#CD9135] shadow-[0_0_14px_5px_rgba(205,145,53,0.6)]" />
                        </motion.div>

                        <motion.div
                            animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute h-[65%] w-[65%] rounded-full bg-[#BB7B24]/[0.14] blur-[65px]"
                        />

                        {/* Medallion (cursor parallax wrapper) */}
                        <motion.div
                            style={{ x: medX, y: medY }}
                            className="relative flex h-[66%] w-[66%] items-center justify-center"
                        >
                            <motion.div
                                animate={{ y: [0, -13, 0, 8, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="relative flex h-full w-full items-center justify-center"
                            >
                                <div className="absolute inset-0 rotate-45 rounded-[30%] border border-[#F1C965]/30 shadow-[inset_0_0_45px_rgba(187,123,36,0.08),0_0_45px_rgba(187,123,36,0.1)]" />
                                <div className="absolute inset-[8%] rotate-45 rounded-[30%] border border-[#FFF1B8]/20" />
                                <div className="absolute inset-[16%] rotate-45 rounded-[30%] border border-dashed border-[#BB7B24]/20" />
                                <div className="absolute inset-[20%] rounded-full bg-[#F1C965]/[0.10] blur-[45px]" />

                                <motion.div
                                    className="relative z-10 flex h-full w-full items-center justify-center"
                                    animate={{
                                        scale: [1, 1.035, 1],
                                        filter: [
                                            "drop-shadow(0 0 16px rgba(241,201,101,0.25))",
                                            "drop-shadow(0 0 34px rgba(241,201,101,0.55))",
                                            "drop-shadow(0 0 16px rgba(241,201,101,0.25))",
                                        ],
                                    }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[#F1C965]/20 blur-[55px]" />
                                    <Jewel />
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Glass chips (deeper parallax) */}
                        <motion.div
                            style={{ x: chipX, y: chipY }}
                            className="pointer-events-none absolute inset-0"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 1, ease: EASE }}
                                className="absolute left-[-2%] top-[62%]"
                            >
                               
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.7, duration: 1, ease: EASE }}
                                className="absolute right-[-2%] top-[20%]"
                            >
                                
                            </motion.div>
                        </motion.div>

                        {/* Sparkles */}
                        {sparkles.map((s, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{ left: s.x, top: s.y }}
                                animate={{ opacity: [0.15, 1, 0.2], scale: [0.6, 1.3, 0.6], rotate: [0, 90, 180] }}
                                transition={{ duration: 3 + i, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Sparkles
                                    size={s.size}
                                    className="text-[#FFF1B8] drop-shadow-[0_0_12px_rgba(241,201,101,0.9)]"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ================= Scroll cue ================= */}
            <motion.a
                href="#collections"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[#BB7B24]/80 transition-colors hover:text-[#FFF1B8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1C965]"
            >
                <span className="text-[9px] uppercase tracking-[0.3em]">Discover More</span>
                <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={15} strokeWidth={1.4} />
                </motion.span>
            </motion.a>
        </main>
        </>
    );
}
