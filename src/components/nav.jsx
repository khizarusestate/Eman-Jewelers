
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "./ToastProvider";
import {
    Search,
    Heart,
    ShoppingBag,
    UserRound,
    ArrowUpRight,
    Gem,
    X
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Nav() {
    const [searchOpen, setSearchOpen] = useState(false);
    const { user, logout } = useAuth();
    const toast = useToast();
    const isAuthenticated = Boolean(user);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const closeMenu = () => setMobileOpen(false);

    /* Header gets denser once the page scrolls */
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Mobile menu: lock page scroll, close on Escape or when resizing to desktop */
    useEffect(() => {
        if (!mobileOpen) return undefined;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKey = (e) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = () => {
            if (mq.matches) setMobileOpen(false);
        };

        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onChange);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onChange);
        };
    }, [mobileOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Collections", href: "/#collections" },
        { name: "Contact", href: "/#contact" }
    ];

    const textCss = "relative inline-block bg-gradient-to-b from-[#FFF1B8] via-[#F1C965] to-[#BB7B24] bg-clip-text text-transparent font-semibold tracking-wide cursor-pointer drop-shadow-[0_1px_2px_rgba(187,123,36,0.4)] transition-all duration-500 ease-out hover:-translate-y-1 hover:brightness-125 hover:drop-shadow-[0_0_12px_rgba(241,201,101,0.65)] after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#BB7B24] after:via-[#FFF1B8] after:to-[#BB7B24] after:shadow-[0_0_8px_rgba(241,201,101,0.55)] after:transition-all after:duration-500 after:ease-out hover:after:w-full ";

    const iconCss = "text-[#F1C965] transition-all duration-500 hover:text-[#FFF1B8] hover:scale-110 hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(241,201,101,0.8)]";

    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[100] h-[4px] w-full overflow-hidden bg-[#D7B36B]/10"
            >
                <div
                    className="h-full bg-gradient-to-r from-[#9B641E] via-[#FFF0B0] to-[#C58A32] shadow-[0_0_14px_2px_rgba(241,201,101,0.8)] transition-[width] duration-100 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
                />
            </div>
            <style>{`
                @keyframes navFade {
                    from {
                        opacity: 0;
                        transform: translateY(-12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes searchReveal {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .nav-enter {
                    animation: navFade 0.8s ease-out both;
                }

                .search-reveal {
                    animation: searchReveal 0.35s ease-out both;
                }
            `}</style>

            <header
                className={`fixed inset-x-0 top-0 z-50 w-full border-b backdrop-saturate-150 transition-[background-color,border-color,backdrop-filter] duration-500 ${
                    scrolled || mobileOpen
                        ? "border-[#D7B36B]/30 bg-[#080705]/92 shadow-[0_12px_40px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
                        : "border-[#D7B36B]/15 bg-[#080705]/72 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl"
                }`}
            >

                {/* Main Navbar */}
                <nav className="relative mx-auto flex h-[75px] max-w-[1450px] items-center justify-between px-6 nav-enter before:pointer-events-none before:absolute before:inset-x-6 before:bottom-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#D7B36B]/20 before:to-transparent lg:px-12">

                    {/* Logo */}
                    <a href="/" aria-label="Eman Jewelers home" className="group relative shrink-0">
                        <img
                            src="/images/Logo.png"
                            alt="Eman Jewelers"
                            className="h-[62px] w-auto object-contain transition-all duration-700 group-hover:scale-[1.04] group-hover:drop-shadow-[0_0_18px_rgba(241,201,101,0.5)] lg:h-[66px]"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10 xl:gap-12">

                        <ul className="flex items-center gap-9 xl:gap-11">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={textCss}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="h-7 w-px bg-gradient-to-b from-transparent via-[#BB7B24]/70 to-transparent" />

                        {/* Action Icons */}
                        <div className="flex items-center gap-7">

                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Search"
                                className={iconCss}
                            >
                                <Search size={21} strokeWidth={1.6} />
                            </button>

                            {isAuthenticated ? (
                                <>
                                    <a href="/account" aria-label="My account" title={user?.name || "My account"} className={iconCss}><UserRound size={21} strokeWidth={1.6} /></a>
                                    <button type="button" aria-label="Sign out" title="Sign out" onClick={async () => { try { await logout(); toast("You have been signed out.", "success"); } catch (error) { toast(error.message, "error"); } }} className={iconCss}><LogOut size={20} strokeWidth={1.6} /></button>
                                </>
                            ) : (
                                <div className="flex items-center gap-3"><a href="/login" className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#D8C08E] transition hover:text-white">Login</a><a href="/register" className="rounded-full border border-[#D7B36B]/55 bg-gradient-to-r from-[#F1C965]/10 to-[#BB7B24]/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F1C965] shadow-[0_0_18px_rgba(241,201,101,0.08)] transition-all duration-500 hover:border-[#F1C965] hover:bg-[#F1C965]/15">Join Us</a></div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => {
                            setMobileOpen((o) => !o);
                            setSearchOpen(false);
                        }}
                        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#BB7B24]/40 bg-[#F1C965]/[0.04] transition-all duration-500 hover:border-[#F1C965]/80 hover:bg-[#F1C965]/10 hover:shadow-[0_0_20px_rgba(241,201,101,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1C965] lg:hidden"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className="relative block h-3.5 w-5">
                            <motion.span
                                className="absolute left-0 block h-[1.5px] w-full rounded-full bg-[#F1C965]"
                                animate={mobileOpen ? { top: "50%", rotate: 45 } : { top: "0%", rotate: 0 }}
                                transition={{ duration: 0.45, ease: EASE }}
                            />
                            <motion.span
                                className="absolute left-0 top-1/2 block h-[1.5px] w-full rounded-full bg-[#F1C965]"
                                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.3, ease: EASE }}
                            />
                            <motion.span
                                className="absolute left-0 block h-[1.5px] w-full rounded-full bg-[#F1C965]"
                                animate={mobileOpen ? { top: "50%", rotate: -45 } : { top: "100%", rotate: 0 }}
                                transition={{ duration: 0.45, ease: EASE }}
                            />
                        </span>
                    </button>
                </nav>

                {/* Search Panel */}
                {searchOpen && (
                    <div className="search-reveal max-w-[1450px] mx-auto px-6 lg:px-12 pb-5">
                        <div className="flex items-center gap-4 border border-[#BB7B24]/40 rounded-xl px-5 py-3 bg-[#080808]/90 shadow-[0_5px_25px_rgba(187,123,36,0.12)]">

                            <Search
                                size={20}
                                className="text-[#F1C965] shrink-0"
                            />

                            <input
                                type="search"
                                placeholder="Search exquisite jewellery..."
                                className="w-full bg-transparent outline-none text-[#F1C965] placeholder:text-[#BB7B24]/60"
                            />

                            <button
                                onClick={() => setSearchOpen(false)}
                                className="text-[#F1C965] hover:text-white transition-colors"
                                aria-label="Close search"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                )}

                
            </header>

            {/* Mobile Navigation — overlays Home, Home itself never moves */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu"
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="fixed inset-x-0 bottom-0 top-[75px] z-40 flex flex-col overflow-y-auto border-t border-[#BB7B24]/20 bg-[#050403]/80 backdrop-blur-2xl lg:hidden"
                    >
                        {/* Ambient glow */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <div className="absolute -left-24 top-[8%] h-72 w-72 rounded-full bg-[#A76A16]/20 blur-[90px]" />
                            <div className="absolute -right-24 bottom-[12%] h-72 w-72 rounded-full bg-[#F1C965]/10 blur-[90px]" />
                        </div>

                        <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-7 pb-8 pt-4">

                            <motion.ul variants={listVariants} initial="hidden" animate="show">
                                {navLinks.map((link) => (
                                    <motion.li key={link.name} variants={itemVariants}>
                                        <a
                                            href={link.href}
                                            onClick={closeMenu}
                                            className="group flex items-center justify-between border-b border-[#BB7B24]/15 py-[1.15rem] font-serif text-[1.9rem] leading-none tracking-[-0.02em] text-[#FFF9EA] transition-colors duration-500 hover:text-[#F1C965] active:text-[#F1C965]"
                                        >
                                            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                                                {link.name}
                                            </span>
                                            <ArrowUpRight
                                                size={20}
                                                strokeWidth={1.4}
                                                className="text-[#BB7B24] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F1C965]"
                                            />
                                        </a>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            {/* Quick actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                                className={`mt-9 grid ${isAuthenticated ? "grid-cols-3" : "grid-cols-2"} gap-3`}
                            >
                                {[
                                    { label: "Search", Icon: Search, onClick: () => { setSearchOpen(true); closeMenu(); } },
                                    ...(isAuthenticated ? [
                                        { label: "Account", Icon: UserRound, href: "/account" },
                                        { label: "Sign out", Icon: LogOut, onClick: async () => { try { await logout(); toast("You have been signed out.", "success"); closeMenu(); } catch (error) { toast(error.message, "error"); } } },
                                    ] : [
                                        { label: "Join Us", Icon: UserRound, href: "/register" },
                                    ]),
                                ].map((item) => {
                                    const { label, Icon, href, onClick } = item;
                                    const inner = (
                                        <>
                                            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#BB7B24]/40 bg-[#F1C965]/[0.04] text-[#F1C965] transition-all duration-500 group-hover:border-[#F1C965]/80 group-hover:bg-[#F1C965]/10 group-hover:shadow-[0_0_22px_rgba(241,201,101,0.3)]">
                                                <Icon size={21} strokeWidth={1.5} />
                                            </span>
                                            <span className="text-[11px] tracking-wide text-[#A99A83] transition-colors duration-500 group-hover:text-[#F1C965]">
                                                {label}
                                            </span>
                                        </>
                                    );
                                    const cls = "group flex flex-col items-center gap-2.5";
                                    return href ? (
                                        <a key={label} href={href} onClick={closeMenu} className={cls}>
                                            {inner}
                                        </a>
                                    ) : (
                                        <button key={label} onClick={onClick} aria-label={label} className={cls}>
                                            {inner}
                                        </button>
                                    );
                                })}
                            </motion.div>

                            {/* Signature */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.7 }}
                                className="mt-auto flex flex-col items-center gap-3 pt-12"
                            >
                                <div className="flex w-full max-w-[220px] items-center gap-3">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#BB7B24]/70" />
                                    <Gem size={14} strokeWidth={1.3} className="text-[#F1C965] drop-shadow-[0_0_8px_rgba(241,201,101,0.7)]" />
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#BB7B24]/70" />
                                </div>
                                <p className="font-serif text-lg text-[#CD9135]">Eman Jewelers</p>
                                <p className="text-[11px] tracking-wide text-[#A99A83]">Fine gold and diamond jewellery</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
