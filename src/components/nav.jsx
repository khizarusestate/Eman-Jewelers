
import { useState } from "react";
import {
    Search,
    Heart,
    ShoppingBag,
    UserRound,
    Menu,
    X
} from "lucide-react";

export default function Nav() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Collections", href: "#collections" },
        { name: "Contact", href: "#contact" }
    ];

    const textCss = "relative inline-block bg-gradient-to-b from-[#FFF1B8] via-[#F1C965] to-[#BB7B24] bg-clip-text text-transparent font-semibold tracking-wide cursor-pointer drop-shadow-[0_1px_2px_rgba(187,123,36,0.4)] transition-all duration-500 ease-out hover:-translate-y-1 hover:brightness-125 hover:drop-shadow-[0_0_12px_rgba(241,201,101,0.65)] after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#BB7B24] after:via-[#FFF1B8] after:to-[#BB7B24] after:shadow-[0_0_8px_rgba(241,201,101,0.55)] after:transition-all after:duration-500 after:ease-out hover:after:w-full ";

    const iconCss = "text-[#F1C965] transition-all duration-500 hover:text-[#FFF1B8] hover:scale-110 hover:-translate-y-1 hover:drop-shadow-[0_0_10px_rgba(241,201,101,0.8)]";

    return (
        <>
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

            <header className="relative z-50 w-full bg-black ">

                {/* Main Navbar */}
                <nav className="max-w-[1450px] mx-auto h-[75px] px-6 lg:px-12 flex items-center justify-between nav-enter">

                    {/* Logo */}
                    <a href="#home" className="shrink-0 group">
                        <img
                            src="/images/Logo.png"
                            alt="Eman Jewelers"
                            className="h-[65px] w-auto object-contain transition-all duration-700 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(241,201,101,0.4)]"
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

                            <a
                                href="/wishlist"
                                aria-label="Wishlist"
                                className={iconCss}
                            >
                                <Heart size={21} strokeWidth={1.6} />
                            </a>

                            <a
                                href="/account"
                                aria-label="Account"
                                className={iconCss}
                            >
                                <UserRound size={21} strokeWidth={1.6} />
                            </a>

                            <a
                                href="/cart"
                                aria-label="Shopping Bag"
                                className={`relative ${iconCss}`}
                            >
                                <ShoppingBag size={22} strokeWidth={1.6} />
                            </a>

                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`lg:hidden ${iconCss}`}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <X size={26} />
                        ) : (
                            <Menu size={26} />
                        )}
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

                {/* Mobile Navigation */}
                {mobileOpen && (
                    <div className="lg:hidden bg-transparent search-reveal">

                        <ul className="flex flex-col items-center gap-7 py-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={textCss}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-center items-center gap-9 pb-8">

                            <button
                                onClick={() => {
                                    setSearchOpen(!searchOpen);
                                    setMobileOpen(false);
                                }}
                                className={iconCss}
                                aria-label="Search"
                            >
                                <Search size={22} />
                            </button>

                            <a href="/wishlist" className={iconCss}>
                                <Heart size={22} />
                            </a>

                            <a href="/account" className={iconCss}>
                                <UserRound size={22} />
                            </a>

                            <a href="/cart" className={iconCss}>
                                <ShoppingBag size={22} />
                            </a>

                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
