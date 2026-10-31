import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    Gem,
    Heart,
    Sparkles,
    ShieldCheck,
    Fingerprint,
    MoveUpRight,
    Quote,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const reveal = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const values = [
    {
        number: "01",
        Icon: Gem,
        title: "Considered beauty",
        copy: "Pieces chosen for their balance, character and lasting appeal — never just for a passing moment.",
    },
    {
        number: "02",
        Icon: Heart,
        title: "Made meaningful",
        copy: "Jewellery becomes part of a story. We believe the right piece should feel personal from the very first glance.",
    },
    {
        number: "03",
        Icon: ShieldCheck,
        title: "Confidence in every detail",
        copy: "A thoughtful experience, clear information and care at every step — because trust should feel as refined as the piece.",
    },
];

const gallery = [
    {
        src: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85",
        alt: "Gold jewellery arranged in soft studio light",
        label: "The details",
    },
    {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
        alt: "Delicate necklace and fine jewellery",
        label: "The feeling",
    },
    {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
        alt: "Elegant rings photographed close up",
        label: "The keepsakes",
    },
];

function Eyebrow({ children, light = false }) {
    return (
        <div className={`mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] ${light ? "text-[#E8C77D]" : "text-[#B78B42]"}`}>
            <span className="h-px w-8 bg-current" />
            {children}
        </div>
    );
}

function ImageFrame({ src, alt, className = "", delay = 0 }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, y: 26, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.9, delay, ease: EASE }}
            className={`group relative overflow-hidden bg-[#17130D] ${className}`}
        >
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.055]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080705]/35 via-transparent to-white/[0.04] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
        </motion.div>
    );
}

export default function About() {
    const reduce = useReducedMotion();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    return (
        <main className="relative overflow-hidden bg-[#080705] text-[#F8F3E8] selection:bg-[#E8C77D] selection:text-[#080705]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(ellipse_at_75%_15%,rgba(177,126,43,0.16),transparent_48%)]" />
            <div className="pointer-events-none absolute left-[-14rem] top-[1000px] h-[32rem] w-[32rem] rounded-full bg-[#8B6126]/[0.08] blur-[120px]" />

            {/* Editorial hero */}
            <section className="relative mx-auto grid min-h-[780px] max-w-[1500px] items-center gap-10 px-6 pb-20 pt-32 sm:px-10 lg:min-h-[850px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-16 lg:pb-24 lg:pt-36">
                <div className="relative z-10 order-2 lg:order-1">
                    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
                        <motion.div variants={reveal}>
                            <Eyebrow light>Our world · Eman Jewelers</Eyebrow>
                        </motion.div>
                        <motion.h1
                            variants={reveal}
                            className="max-w-2xl font-serif text-[clamp(3.5rem,8vw,7.6rem)] font-normal leading-[0.9] tracking-[-0.065em]"
                        >
                            More than
                            <span className="block pl-[0.42em] italic text-[#E8C77D]">adornment.</span>
                            <span className="mt-2 block text-[#F8F3E8]">A feeling.</span>
                        </motion.h1>
                        <motion.p variants={reveal} className="mt-8 max-w-lg text-[15px] leading-8 text-[#C2B9A8] sm:text-base">
                            Jewellery marks the moments we carry with us. At Eman Jewelers, we celebrate the beauty of those moments with pieces chosen to feel personal, elegant and unmistakably yours.
                        </motion.p>
                        <motion.div variants={reveal} className="mt-9 flex flex-wrap items-center gap-5">
                            <a href="/#collections" className="group inline-flex items-center gap-4 border border-[#D7B36B]/60 px-6 py-4 text-[10px] uppercase tracking-[0.22em] transition-all duration-500 hover:border-[#F4D99A] hover:bg-[#E8C77D] hover:text-[#100D07]">
                                Explore the collection
                                <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </a>
                            <a href="/#contact" className="inline-flex items-center gap-2 text-xs text-[#C2B9A8] transition-colors hover:text-[#E8C77D]">
                                Get in touch <ArrowRight size={14} />
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 1 }}
                        className="mt-14 flex items-center gap-4 border-t border-white/10 pt-5 sm:mt-20"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D7B36B]/40 text-[#E8C77D]">
                            <Sparkles size={17} strokeWidth={1.2} />
                        </div>
                        <p className="text-[10px] uppercase leading-5 tracking-[0.22em] text-[#B7AC98]">
                            Thoughtful by design
                            <span className="block text-[#F5EBDD]">Beautiful beyond the moment</span>
                        </p>
                    </motion.div>
                </div>

                <div className="relative order-1 mx-auto w-full max-w-[660px] lg:order-2">
                    <motion.div
                        initial={reduce ? false : { opacity: 0, scale: 0.96, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.3, ease: EASE }}
                        className="relative ml-auto aspect-[0.82] w-[83%] overflow-hidden sm:w-[76%] lg:w-[82%]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1400&q=90"
                            alt="Sculptural gold jewellery in an editorial studio photograph"
                            fetchPriority="high"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080705]/45 via-transparent to-[#D6B16A]/10" />
                        <div className="absolute inset-5 border border-white/25 sm:inset-7" />
                        <motion.div
                            animate={reduce ? {} : { y: [0, -8, 0], rotate: [0, 2, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-8 left-[-12%] flex items-center gap-3 border border-[#D7B36B]/35 bg-[#100D08]/85 px-4 py-3 backdrop-blur-xl sm:bottom-12 sm:px-5 sm:py-4"
                        >
                            <Gem size={21} strokeWidth={1} className="text-[#E8C77D]" />
                            <div>
                                <p className="font-serif text-lg leading-none">A lasting impression</p>
                                <p className="mt-1.5 text-[8px] uppercase tracking-[0.2em] text-[#B7AC98]">The Eman perspective</p>
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className="pointer-events-none absolute -right-1 top-[12%] -z-0 h-28 w-28 rounded-full border border-[#D7B36B]/20 sm:-right-4 sm:h-40 sm:w-40" />
                    <div className="absolute -bottom-9 right-[4%] flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[#B7AC98]">
                        <span className="h-px w-8 bg-[#D7B36B]/70" /> An eye for the exceptional
                    </div>
                </div>
            </section>

            {/* Statement */}
            <section className="relative border-y border-white/[0.08] bg-[#100D08]">
                <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-16 lg:py-36">
                    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                        <Eyebrow light>The heart of Eman</Eyebrow>
                        <p className="font-serif text-3xl leading-tight text-[#E8C77D] sm:text-4xl">A little luxury.<br />A lifetime of meaning.</p>
                    </motion.div>
                    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
                        <p className="font-serif text-[clamp(1.8rem,3.8vw,3.5rem)] leading-[1.2] tracking-[-0.035em] text-[#F8F3E8]">
                            We see jewellery as <span className="italic text-[#E8C77D]">more than something you wear.</span> It can hold a memory, mark a new beginning, or simply remind you of who you are.
                        </p>
                        <p className="mt-7 max-w-2xl text-sm leading-7 text-[#BDB3A2]">
                            That belief shapes our approach: an appreciation for elegant design, a close eye for the details, and a shopping experience that lets every piece speak for itself.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Principles */}
            <section className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40">
                <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
                    <div>
                        <Eyebrow light>What guides us</Eyebrow>
                        <h2 className="max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.05em] sm:text-7xl">The details make<br /><span className="italic text-[#E8C77D]">the difference.</span></h2>
                    </div>
                    <p className="max-w-sm text-sm leading-7 text-[#BDB3A2]">A point of view built around beauty, meaning and the kind of care that makes choosing a piece feel special.</p>
                </motion.div>

                <div className="grid border-t border-white/10 md:grid-cols-3">
                    {values.map(({ number, Icon, title, copy }, index) => (
                        <motion.article
                            key={number}
                            initial={reduce ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.75, delay: index * 0.12, ease: EASE }}
                            className="group border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-7 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-serif text-sm text-[#AFA18A]">{number} / 03</span>
                                <Icon size={22} strokeWidth={1.1} className="text-[#D7B36B] transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110" />
                            </div>
                            <h3 className="mt-10 font-serif text-2xl text-[#F8F3E8] transition-colors duration-500 group-hover:text-[#E8C77D]">{title}</h3>
                            <p className="mt-4 max-w-sm text-sm leading-7 text-[#BDB3A2]">{copy}</p>
                            <div className="mt-8 h-px w-10 bg-[#D7B36B]/70 transition-all duration-700 group-hover:w-20" />
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Visual story */}
            <section className="relative border-y border-white/[0.08] bg-[#100D08] py-20 sm:py-28 lg:py-36">
                <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
                    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mb-12 flex items-end justify-between gap-6">
                        <div>
                            <Eyebrow light>Beauty in focus</Eyebrow>
                            <h2 className="font-serif text-5xl tracking-[-0.05em] sm:text-7xl">Look a little <span className="italic text-[#E8C77D]">closer.</span></h2>
                        </div>
                        <Sparkles size={26} strokeWidth={1} className="mb-2 hidden text-[#D7B36B] sm:block" />
                    </motion.div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_0.78fr_1fr] lg:items-start lg:gap-5">
                        {gallery.map((item, index) => (
                            <div key={item.label} className={index === 1 ? "lg:mt-16" : index === 2 ? "sm:col-span-2 lg:col-span-1 lg:mt-8" : ""}>
                                <ImageFrame src={item.src} alt={item.alt} className="aspect-[0.9] sm:aspect-[0.82] lg:aspect-[0.78]" delay={index * 0.1} />
                                <div className="mt-4 flex items-center justify-between border-b border-white/10 pb-4">
                                    <span className="font-serif text-xl">{item.label}</span>
                                    <ArrowUpRight size={16} className="text-[#D7B36B]" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-[9px] uppercase tracking-[0.18em] text-[#8F8575]">Editorial imagery · photographs via Unsplash</p>
                </div>
            </section>

            {/* Closing invitation */}
            <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(177,126,43,0.15),transparent_55%)]" />
                <motion.div
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative mx-auto max-w-4xl text-center"
                >
                    <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-[#D7B36B]/35 text-[#E8C77D]">
                        <Fingerprint size={23} strokeWidth={1} />
                    </div>
                    <Eyebrow light>Find your something</Eyebrow>
                    <h2 className="font-serif text-[clamp(3rem,7.5vw,6.8rem)] leading-[0.92] tracking-[-0.06em]">Your story.<br /><span className="italic text-[#E8C77D]">Your signature.</span></h2>
                    <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#BDB3A2]">Discover pieces that feel like you, or get in touch with our team for help finding the right one.</p>
                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <a href="/#collections" className="group inline-flex items-center justify-center gap-3 bg-[#E8C77D] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#100D08] transition-all duration-500 hover:bg-[#F8E5B3]">
                            Discover jewellery <MoveUpRight size={15} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>
                        <a href="/#contact" className="inline-flex items-center justify-center gap-3 border border-white/20 px-7 py-4 text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 hover:border-[#D7B36B]/70 hover:text-[#E8C77D]">
                            Contact us <ArrowDownRight size={15} />
                        </a>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
