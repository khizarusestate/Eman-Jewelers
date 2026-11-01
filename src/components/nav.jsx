
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "./ToastProvider";
import { useShop } from "../context/ShopContext";
import Contact from "./contact";
import {
    Search,
    Heart,
    ShoppingBag,
    UserRound,
    ArrowUpRight,
    Gem,
    X,
    LogOut
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
    const [contactOpen, setContactOpen] = useState(false);
    const { user, logout } = useAuth();
    const toast = useToast();
    const { cartCount, wishlist } = useShop();
    const isAuthenticated = Boolean(user);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [navVisible, setNavVisible] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    const closeMenu = () => setMobileOpen(false);

    /* Keep the navbar visible; retain scroll progress tracking. */
    useEffect(() => {
        const onScroll = () => {
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

            <motion.header
                animate={{ y: mobileOpen ? "-110%" : "0%" }}
                transition={{ duration: 0.55, ease: EASE }}
                className={`${mobileOpen ? "hidden lg:block" : ""} fixed inset-x-0 top-0 z-50 w-full border-b backdrop-saturate-150 transition-[background-color,border-color,backdrop-filter] duration-500 ${scrolled || mobileOpen ? "border-[#D7B36B]/30 bg-[#080705]/92 shadow-[0_12px_40px_rgba(0,0,0,0.38)] backdrop-blur-2xl" : "border-[#D7B36B]/15 bg-[#080705]/72 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl"}` }
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
                                        onClick={link.name === "Contact" ? (event) => { event.preventDefault(); setContactOpen(true); } : undefined}
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

                            <a href="/wishlist" aria-label={`Wishlist, ${wishlist.length} saved items`} title="Wishlist" className={`${iconCss} relative`}><Heart size={21} strokeWidth={1.6}/>{wishlist.length > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#F1C965] px-1 text-[9px] font-bold text-[#17130D]">{wishlist.length}</span>}</a>
                            <a href="/cart" aria-label={`Shopping bag, ${cartCount} items`} title="Shopping bag" className={`${iconCss} relative`}><ShoppingBag size={21} strokeWidth={1.6}/>{cartCount > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#F1C965] px-1 text-[9px] font-bold text-[#17130D]">{cartCount}</span>}</a>
                            <button
                                type="button"
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Search"
                                aria-expanded={searchOpen}
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

                
            </motion.header>

            {contactOpen && <Contact onClose={() => setContactOpen(false)} />}

            {/* Compact mobile side drawer; leaves part of the page visible */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu-shell"
                        className="fixed inset-0 z-[60] lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <button type="button" aria-label="Close menu overlay" onClick={closeMenu} className="absolute inset-0 h-full w-full bg-black/45 backdrop-blur-[2px]" />
                        <motion.aside
                            id="mobile-menu"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.42, ease: EASE }}
                            className="absolute inset-y-0 left-0 flex w-[78vw] max-w-[320px] flex-col overflow-y-auto rounded-br-[100px] border-r border-[#D7B36B]/30 bg-[#080705] shadow-[18px_0_55px_rgba(0,0,0,0.45)]"
                        >
                            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                                <div className="absolute -inset-8 scale-105 bg-cover bg-center opacity-20 blur-[12px]" style={{ backgroundImage: "url('/images/Home.png')" }} />
                                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(8,7,5,0.72),rgba(8,7,5,0.94)_70%,rgba(22,14,5,0.98))]" />
                                <div className="absolute -right-28 bottom-[5%] h-72 w-72 rounded-full bg-[#F1C965]/15 blur-[90px]" />
                            </div>
                            <div className="relative flex min-h-full flex-col px-6 pb-8 pt-7">
                                <div className="mb-8 flex items-center justify-between gap-3 border-b border-[#D7B36B]/25 pb-5">
                                    <a href="/" onClick={closeMenu} aria-label="Eman Jewelers home" className="flex min-w-0 items-center gap-3">
                                        <img src="/images/Logo.png" alt="Eman Jewelers logo" className="h-11 w-11 shrink-0 rounded-full border border-[#D7B36B]/40 object-contain p-1" />
                                    </a>
                                    <button type="button" onClick={closeMenu} aria-label="Close menu" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7B36B]/30 text-[#F1C965] transition hover:border-[#F1C965]/70 hover:bg-[#F1C965]/10 hover:text-[#FFF1B8]"><X size={18} strokeWidth={1.7} /></button>
                                </div>

                                <motion.ul variants={listVariants} initial="hidden" animate="show" className="flex flex-col">
                                    {navLinks.map((link) => (
                                        <motion.li key={link.name} variants={itemVariants}>
                                            <a href={link.href} onClick={link.name === "Contact" ? (event) => { event.preventDefault(); closeMenu(); setContactOpen(true); } : closeMenu} className="group flex min-h-[48px] items-center border-b border-[#D7B36B]/15 py-3 text-[#FFF9EA] transition-colors duration-300 hover:text-[#F1C965]">
                                                <span className="font-serif text-[1.02rem] leading-tight tracking-[-0.01em] transition-transform duration-300 group-hover:translate-x-1">{link.name}</span>
                                            </a>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                <div className="relative mt-6 flex flex-col items-start gap-4 text-[11px] tracking-wide text-[#BCA477]">
                                    <button type="button" onClick={() => { setSearchOpen(true); closeMenu(); }} className="flex items-center gap-3 transition hover:text-[#FFF1B8]"><Search size={17} strokeWidth={1.6} />Search jewellery</button>
                                    <a href="/wishlist" onClick={closeMenu} className="flex items-center gap-3 transition hover:text-[#FFF1B8]"><Heart size={17} strokeWidth={1.6} />Wishlist{wishlist.length > 0 && <span className="rounded-full bg-[#F1C965]/15 px-2 py-0.5 text-[9px] text-[#F1C965]">{wishlist.length}</span>}</a>
                                    <a href="/cart" onClick={closeMenu} className="flex items-center gap-3 transition hover:text-[#FFF1B8]"><ShoppingBag size={17} strokeWidth={1.6} />Shopping bag{cartCount > 0 && <span className="rounded-full bg-[#F1C965]/15 px-2 py-0.5 text-[9px] text-[#F1C965]">{cartCount}</span>}</a>
                                    {isAuthenticated ? <><a href="/account" onClick={closeMenu} className="flex items-center gap-3 transition hover:text-[#FFF1B8]"><UserRound size={17} strokeWidth={1.6} />My account</a><button type="button" onClick={async () => { try { await logout(); toast("You have been signed out.", "success"); closeMenu(); } catch (error) { toast(error.message, "error"); } }} className="flex items-center gap-3 transition hover:text-[#FFF1B8]"><LogOut size={17} strokeWidth={1.6} />Sign out</button></> : <><a href="/login" onClick={closeMenu} className="flex items-center gap-3 transition hover:text-[#FFF1B8]"><UserRound size={17} strokeWidth={1.6} />Login</a><a href="/register" onClick={closeMenu} className="flex items-center gap-3 transition hover:text-[#FFF1B8]"><ArrowUpRight size={17} strokeWidth={1.6} />Join Us</a></>}
                                </div>

                                <div className="relative mt-auto pt-10">
                                    <div className="mb-3 h-px w-16 bg-gradient-to-r from-[#F1C965]/70 to-transparent" />
                                    <p className="font-serif text-sm text-[#CD9135]">Fine gold & diamonds</p>
                                </div>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
