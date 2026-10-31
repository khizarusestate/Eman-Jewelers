import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useShop } from "../context/ShopContext";

const filters = ["All Pieces", "Rings", "Necklaces", "Earrings", "Bracelets"];
const products = [
  { id: 1, name: "Celeste Diamond Ring", category: "Rings", price: "PKR 18,500", tag: "Bestseller", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Solstice Gold Necklace", category: "Necklaces", price: "PKR 24,900", tag: "New arrival", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Luna Pearl Earrings", category: "Earrings", price: "PKR 12,800", tag: "", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Eternity Gold Bangle", category: "Bracelets", price: "PKR 16,400", tag: "Limited edit", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Aurora Halo Ring", category: "Rings", price: "PKR 21,500", tag: "", image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Amara Layered Chain", category: "Necklaces", price: "PKR 19,200", tag: "Customer favourite", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Golden Hour Hoops", category: "Earrings", price: "PKR 9,800", tag: "", image: "https://images.unsplash.com/photo-1630019852942-ab7c9ab60959?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Serein Charm Bracelet", category: "Bracelets", price: "PKR 14,700", tag: "", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85" },
];
const ease = [0.16, 1, 0.3, 1];

export default function Collection() {
  const [active, setActive] = useState("All Pieces");
  const { wishlist: favorites, cart, addToCart, toggleWishlist, cartCount } = useShop();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const reduceMotion = useReducedMotion();
  const filtered = active === "All Pieces" ? products : products.filter((p) => p.category === active);
  const shown = showAll ? filtered : filtered.slice(0, 4);

  const addProductToCart = (product) => {
    addToCart(product.id, 1);
    setCartMessage(product.name);
  };
  const isInCart = (productId) => cart.some((item) => item.id === productId);

  return (
    <section id="collections" className="relative isolate scroll-mt-20 overflow-hidden bg-[#F7F3EA] text-[#17130D]">
      <div className="pointer-events-none absolute -left-40 top-28 h-96 w-96 rounded-full bg-[#D9B66C]/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 top-[38%] h-96 w-96 rounded-full bg-[#B98536]/10 blur-[110px]" />
      <div className="relative mx-auto max-w-[1480px] px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32 lg:px-14">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, ease }} className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#9A773F] sm:text-xs">Made to be treasured</p>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Discover your <span className="bg-gradient-to-r from-[#805018] via-[#C99A45] to-[#9C6A25] bg-clip-text italic text-transparent">signature.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#777064] sm:text-base">Thoughtfully chosen pieces for the everyday, the unforgettable, and everything in between.</p>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 border-y border-[#B98536]/25 py-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7C6B51]">Explore by style</span>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-end sm:pb-0" role="group" aria-label="Filter collection by category">
            {filters.map((filter) => <button key={filter} type="button" onClick={() => { setActive(filter); setShowAll(false); setSelectedProduct(null); }} aria-pressed={active === filter} className={`shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-medium transition-all duration-300 sm:px-5 sm:text-[11px] ${active === filter ? "border-[#17130D] bg-[#17130D] text-[#F8E9BE] shadow-lg" : "border-[#C7BDA9] bg-white/60 text-[#5F584D] hover:border-[#9A773F] hover:bg-white"}`}>{filter}</button>)}
          </div>
        </div>

        <div className="mb-4 flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.12em] text-[#82796B]"><ShoppingBag size={13} /> <a href="/cart" className="underline underline-offset-4">Bag: {cartCount} {cartCount === 1 ? "item" : "items"}</a></div>
        <motion.div layout className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          <AnimatePresence mode="popLayout">
            {shown.map((product, index) => <motion.article layout key={product.id} initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.045, ease }} className="group min-w-0">
              <div className="relative aspect-[4/5] overflow-hidden border border-[#B98536]/40 bg-[#EAE3D5] shadow-[0_8px_24px_rgba(65,45,18,0.08),inset_0_0_0_1px_rgba(255,255,255,0.45)]">
                <button type="button" onClick={() => setSelectedProduct((current) => current === product.id ? null : product.id)} aria-expanded={selectedProduct === product.id} aria-label={`Show purchase options for ${product.name}`} className="absolute inset-0 z-[1] h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#B98536]">
                  <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]" />
                </button>
                <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#17130D]/15 via-transparent to-white/5 opacity-35 transition-opacity duration-500 group-hover:opacity-55" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] opacity-[0.14] mix-blend-multiply" style={{ backgroundImage: "radial-gradient(circle at 12% 18%, rgba(185,133,54,.9) 0 1px, transparent 1.8px), radial-gradient(circle at 78% 14%, rgba(185,133,54,.8) 0 1px, transparent 1.9px), radial-gradient(circle at 88% 42%, rgba(185,133,54,.75) 0 1px, transparent 1.8px), radial-gradient(circle at 18% 72%, rgba(185,133,54,.8) 0 1px, transparent 1.8px), radial-gradient(circle at 68% 84%, rgba(185,133,54,.85) 0 1px, transparent 1.9px), radial-gradient(circle at 42% 34%, rgba(255,255,255,.9) 0 1px, transparent 2px)" }} />
                <div aria-hidden="true" className="pointer-events-none absolute inset-[5px] z-[4] border border-white/35" />
                {product.tag && <span className="pointer-events-none absolute left-2.5 top-2.5 z-[5] bg-[#F7F3EA]/90 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#78531F] backdrop-blur-md sm:left-4 sm:top-4 sm:text-[9px]">{product.tag}</span>}
                <button type="button" onClick={() => toggleWishlist(product.id)} aria-label={favorites.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={favorites.includes(product.id)} className={`absolute right-2.5 top-2.5 z-[6] flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10 ${favorites.includes(product.id) ? "border-[#B98536] bg-[#B98536] text-white" : "border-white/70 bg-[#F7F3EA]/85 text-[#30271A] hover:scale-105 hover:bg-white"}`}><Heart size={16} fill={favorites.includes(product.id) ? "currentColor" : "none"} strokeWidth={1.6} /></button>
                <AnimatePresence>
                  {selectedProduct === product.id && <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }} className="absolute inset-x-2 bottom-2 z-[7] flex flex-col gap-2 sm:inset-x-4 sm:bottom-4">
                    {!isInCart(product.id) ? <button type="button" onClick={() => addProductToCart(product)} className="flex min-h-10 items-center justify-center gap-2 border border-[#F8E9BE]/70 bg-[#17130D]/95 px-2 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#F8E9BE] shadow-lg backdrop-blur-md transition-colors hover:bg-[#59401F] sm:text-[10px]"><ShoppingBag size={13} /> Add to cart</button> : <a href="/cart" onClick={() => setSelectedProduct(null)} className="flex min-h-10 items-center justify-center gap-2 border border-[#F8E9BE]/70 bg-[#F7F3EA]/95 px-2 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#3E2B12] shadow-lg backdrop-blur-md sm:text-[10px]"><ShoppingBag size={13} /> In bag · View</a>}
                    <a href={`/product/${product.id}`} onClick={() => setSelectedProduct(null)} className="flex min-h-10 items-center justify-center bg-[#F7F3EA]/95 px-2 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#3E2B12] shadow-lg backdrop-blur-md transition-colors hover:bg-white sm:text-[10px]">Buy now</a>
                    <button type="button" onClick={() => setSelectedProduct(null)} aria-label="Close purchase options" className="absolute -right-1 -top-[6.5rem] flex h-7 w-7 items-center justify-center rounded-full border border-white/70 bg-[#F7F3EA]/95 text-[#30271A] shadow-md sm:-right-2 sm:-top-[6.5rem]"><X size={14} /></button>
                  </motion.div>}
                </AnimatePresence>
              </div>
              <button type="button" onClick={() => setSelectedProduct((current) => current === product.id ? null : product.id)} className="block w-full pt-4 text-left sm:pt-5" aria-label={`Select ${product.name}`}>
                <div className="mb-1.5 flex items-start justify-between gap-2"><h3 className="font-serif text-[15px] leading-snug sm:text-lg">{product.name}</h3><span className="mt-1 hidden text-[8px] uppercase tracking-[0.14em] text-[#9B7B46] sm:inline">{product.category}</span></div>
                <p className="text-[11px] leading-5 text-[#82796B] sm:text-xs">A timeless accent, thoughtfully chosen for you.</p>
                <div className="mt-3 flex items-center justify-between gap-2"><span className="text-xs font-semibold tracking-wide text-[#5D411D] sm:text-sm">{product.price}</span><span className="text-[9px] uppercase tracking-[0.1em] text-[#9A773F]">{selectedProduct === product.id ? "Options open" : "View options"}</span></div>
              </button>
            </motion.article>)}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#B98536]/25 pt-7 sm:mt-16 sm:flex-row">
          <p className="text-center text-[10px] uppercase tracking-[0.15em] text-[#877A65] sm:text-left">Showing {shown.length} of {filtered.length} curated pieces <span className="mx-2 text-[#B98536]">✦</span> Illustrative data</p>
          <button type="button" onClick={() => setShowAll((value) => !value)} className="inline-flex min-h-12 items-center gap-3 border border-[#9B7B46]/55 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4B3920] transition-all duration-300 hover:border-[#17130D] hover:bg-[#17130D] hover:text-[#F8E9BE]">{showAll ? "Show featured pieces" : "View all pieces"}</button>
        </div>
        <p className="mt-8 text-center text-[10px] leading-5 text-[#958A79]">Preview collection · Product availability and pricing will be updated soon.</p>
        <AnimatePresence>{cartMessage && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 border border-[#B98536]/40 bg-[#17130D] px-5 py-3 text-xs text-[#F8E9BE] shadow-2xl">Added {cartMessage} to your bag.<button type="button" onClick={() => setCartMessage("")} className="ml-4 underline underline-offset-4">Dismiss</button></motion.div>}</AnimatePresence>
      </div>
    </section>
  );
}
