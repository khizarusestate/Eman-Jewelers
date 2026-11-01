import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Download, Heart, Minus, Plus, Share2, ShieldCheck, Truck, ShoppingBag, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";

const products = [
  { id: 1, name: "Celeste Diamond Ring", category: "Rings", price: 18500, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=90", description: "A graceful statement ring with a luminous centre stone and a refined silhouette. Designed to bring a subtle touch of brilliance to everyday moments and special occasions.", material: "Gold-tone finish · Statement stone", care: "Keep away from perfumes, water and harsh chemicals. Store separately in a soft pouch." },
  { id: 2, name: "Solstice Gold Necklace", category: "Necklaces", price: 24900, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=90", description: "An elegant necklace with a polished golden finish, made to layer beautifully or stand on its own.", material: "Gold-tone finish · Fine chain", care: "Wipe gently with a soft dry cloth after use and store in a dry place." },
  { id: 3, name: "Luna Pearl Earrings", category: "Earrings", price: 12800, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=90", description: "Pearl-inspired earrings with a soft glow and timeless styling for day-to-evening wear.", material: "Pearl-inspired detail · Gold-tone finish", care: "Avoid direct contact with water, perfume and cosmetics." },
  { id: 4, name: "Eternity Gold Bangle", category: "Bracelets", price: 16400, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=90", description: "A clean, sculptural bangle that adds a polished finishing touch to your jewellery edit.", material: "Gold-tone finish · Bangle design", care: "Store separately to help prevent scratches and tarnishing." },
  { id: 5, name: "Aurora Halo Ring", category: "Rings", price: 21500, image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=1200&q=90", description: "A radiant halo-inspired design that balances delicate detail with a confident, modern look.", material: "Gold-tone finish · Halo-inspired setting", care: "Keep away from moisture and clean with a soft jewellery cloth." },
  { id: 6, name: "Amara Layered Chain", category: "Necklaces", price: 19200, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=90", description: "A layered-chain look that creates effortless dimension without overwhelming your outfit.", material: "Gold-tone finish · Layered chain style", care: "Place in a pouch after wear and avoid pulling or tangling the chains." },
  { id: 7, name: "Golden Hour Hoops", category: "Earrings", price: 9800, image: "https://images.unsplash.com/photo-1630019852942-ab7c9ab60959?auto=format&fit=crop&w=1200&q=90", description: "Versatile hoops with a warm golden look, ideal for adding understated shine to any occasion.", material: "Gold-tone finish · Hoop style", care: "Avoid sprays and moisture; wipe clean with a soft dry cloth." },
  { id: 8, name: "Serein Charm Bracelet", category: "Bracelets", price: 14700, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=90", description: "A delicate charm bracelet with a graceful finish, designed to wear alone or pair with your favourites.", material: "Gold-tone finish · Charm details", care: "Store separately and remove before bathing or swimming." },
];

const formatPrice = amount => new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(amount);

export default function ProductDetails({ productId }) {
  const product = products.find(item => item.id === productId);
  const { addToCart, toggleWishlist, wishlist, cart } = useShop();
  const [addedToBag, setAddedToBag] = useState(false);
  const cartLine = product ? cart.find((item) => item.id === product.id) : undefined;
  const isInCart = Boolean(cartLine);
  const isWishlisted = product ? wishlist.includes(product.id) : false;
  const [quantity, setQuantity] = useState(1);
  const [showImageFallback, setShowImageFallback] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const reduceMotion = useReducedMotion();
  const total = useMemo(() => (product?.price || 0) * quantity, [product, quantity]);

  if (!product) return (
    <main className="min-h-[75vh] bg-[#F7F3EA] px-6 py-32 text-center text-[#17130D]">
      <h1 className="font-serif text-4xl">Piece not found</h1>
      <a href="/#collections" className="mt-6 inline-flex border border-[#9B7B46] px-6 py-3 text-xs uppercase tracking-widest">Back to collection</a>
    </main>
  );

  const orderText = `Assalam-o-Alaikum, I would like to order from Eman Jewelers:\nProduct: ${product.name}\nCategory: ${product.category}\nQuantity: ${quantity} piece(s)\nUnit price: ${formatPrice(product.price)}\nTotal: ${formatPrice(total)}\nPlease confirm availability and delivery details.`;
  const orderLink = `https://wa.me/?text=${encodeURIComponent(orderText)}`;

  const handleOrder = async () => {
    setShareStatus("");
    setShowImageFallback(false);
    // Use the native share sheet to send the image file and order details together where supported.
    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && typeof File !== "undefined") {
      try {
        const response = await fetch(product.image, { mode: "cors" });
        if (!response.ok) throw new Error("Could not load product image");
        const blob = await response.blob();
        const extension = blob.type.includes("png") ? "png" : "jpg";
        const safeName = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const imageFile = new File([blob], `${safeName}.${extension}`, { type: blob.type || "image/jpeg" });
        if (navigator.canShare({ files: [imageFile] })) {
          await navigator.share({ files: [imageFile], title: `${product.name} · Eman Jewelers`, text: orderText });
          setShareStatus("Share sheet opened. Choose WhatsApp and tap Send to place your order.");
          return;
        }
      } catch (error) {
        if (error?.name === "AbortError") return;
        // If image sharing fails, fall back to a text order and separate image link.
      }
    }
    setShowImageFallback(true);
    setShareStatus("Your browser could not share the image and message together. WhatsApp will open with order details; use the image link below to share the photo separately.");
    window.open(orderLink, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F3EA] pb-16 pt-28 text-[#17130D] sm:pt-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <a href="/#collections" className="mb-7 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#75664E] transition-colors hover:text-[#9A6A25]"><ArrowLeft size={15} /> Back to collection</a>
        <div className="grid items-start gap-8 md:gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="group relative overflow-hidden rounded-[3px] border border-[#B98536]/70 bg-[#EAE3D5] p-[5px] shadow-[0_22px_55px_rgba(65,45,18,0.16),0_0_0_1px_rgba(255,239,199,0.55)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-[2px] z-[4] rounded-[2px] border border-[#F8E9BE]/70" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,239,199,0.22),transparent_48%),linear-gradient(135deg,rgba(255,255,255,0.13),transparent_35%,rgba(91,57,16,0.10))] mix-blend-soft-light" />
            <div aria-hidden="true" className="pointer-events-none absolute -inset-y-1/2 -left-1/2 z-[5] w-1/2 rotate-[18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 blur-md transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100" />
            <div className="relative overflow-hidden">
              <div className="absolute left-3 top-3 z-10 border border-[#B98536]/30 bg-[#F7F3EA]/90 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-[#78531F] backdrop-blur">{product.category}</div>
              <button type="button" onClick={() => toggleWishlist(product.id)} aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={isWishlisted} className={`absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 ${isWishlisted ? "border-[#B98536] bg-[#B98536] text-white" : "border-white/70 bg-[#F7F3EA]/90 text-[#68481F] hover:scale-105 hover:bg-white"}`}><Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.6} /></button>
              <img src={product.image} alt={product.name} fetchPriority="high" className="aspect-[4/5] w-full object-cover saturate-[1.08] contrast-[1.04] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.035] group-hover:saturate-[1.14] group-hover:contrast-[1.06] sm:aspect-[5/4] lg:aspect-[4/5]" />
            </div>
            <div className="relative z-[6] flex items-center justify-between gap-3 border-t border-[#B98536]/25 bg-gradient-to-r from-[#F7F3EA] via-[#FFF9EA] to-[#F0E3C9] px-4 py-3 text-[9px] uppercase tracking-[0.15em] text-[#82745D]"><span>Signature collection</span><span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#9A773F]" /> Made to be treasured</span></div>
          </motion.div>
          <motion.section initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.1 }} className="lg:sticky lg:top-28">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A773F]">Eman Jewelers · Signature collection</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.035em] sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-sm leading-7 text-[#756F63]">{product.description}</p>
            <p className="mt-6 text-2xl font-medium tracking-wide text-[#68481F]">{formatPrice(product.price)} <span className="text-xs font-normal text-[#8A806F]">/ piece</span></p>
            <div className="my-7 h-px bg-[#B98536]/30" />
            <div className="space-y-5 text-sm">
              <div><p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-[#9A773F]">Details</p><p className="text-[#5F584D]">{product.material}</p></div>
              <div><p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-[#9A773F]">Care instructions</p><p className="leading-6 text-[#5F584D]">{product.care}</p></div>
            </div>
            <div className="mt-8 border-y border-[#B98536]/30 py-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <label htmlFor="piece-quantity" className="text-[10px] uppercase tracking-[0.18em] text-[#75664E]">Number of pieces</label>
                <div className="flex items-center border border-[#C9BDA7] bg-white/60">
                  <button type="button" onClick={() => setQuantity(value => Math.max(1, value - 1))} disabled={quantity <= 1} aria-label="Decrease quantity" className="grid h-11 w-11 place-items-center disabled:opacity-30"><Minus size={15} /></button>
                  <input id="piece-quantity" type="number" min="1" max="99" value={quantity} onChange={event => setQuantity(Math.max(1, Math.min(99, Number(event.target.value) || 1)))} className="h-11 w-14 border-x border-[#C9BDA7] bg-transparent text-center text-sm outline-none" />
                  <button type="button" onClick={() => setQuantity(value => Math.min(99, value + 1))} disabled={quantity >= 99} aria-label="Increase quantity" className="grid h-11 w-11 place-items-center disabled:opacity-30"><Plus size={15} /></button>
                </div>
              </div>
              <div className="mt-5 flex items-end justify-between gap-3"><span className="text-[10px] uppercase tracking-[0.18em] text-[#75664E]">Total price</span><strong className="font-serif text-2xl text-[#68481F]">{formatPrice(total)}</strong></div>
            </div>
            <div className="mt-6 grid grid-cols-[1fr_auto] gap-3">{!isInCart ? <button type="button" onClick={() => { addToCart(product.id, quantity); setAddedToBag(true); }} className="flex min-h-14 items-center justify-center gap-2 border border-[#B98536]/50 bg-white/50 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-[#EAE3D5]"><ShoppingBag size={16}/>{addedToBag ? "Added to bag" : "Add to bag"}</button> : <a href="/cart" className="flex min-h-14 items-center justify-center gap-2 bg-[#17130D] px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F8E9BE]"><ShoppingBag size={16}/> Already in bag · View ({cartLine.quantity})</a>}<button type="button" onClick={() => toggleWishlist(product.id)} aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={isWishlisted} className={`grid min-h-14 min-w-14 place-items-center border transition-colors ${isWishlisted ? "border-[#B98536] bg-[#B98536]/10 text-[#68481F]" : "border-[#B98536]/50 text-[#68481F] hover:bg-white/60"}`}><Heart size={19} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.6} /></button></div>
            <button type="button" onClick={handleOrder} className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 bg-[#17130D] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F8E9BE] transition-colors hover:bg-[#5A401F]"><Share2 size={16} /> Order via WhatsApp</button>
                        {shareStatus && <p role="status" className="mt-3 text-xs leading-5 text-[#75664E]">{shareStatus}</p>}
                        {showImageFallback && <div className="mt-3 border border-[#B98536]/35 bg-white/50 p-4">
                          <p className="text-xs leading-5 text-[#5F584D]">Share this product photo separately if your phone did not attach it automatically.</p>
                          <a href={product.image} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#68481F] underline underline-offset-4"><Download size={14} /> Open product image</a>
                        </div>}
            <div className="mt-4 grid grid-cols-2 gap-3 text-[10px] leading-5 text-[#7D7465]"><div className="flex items-start gap-2"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#9A773F]" /><span>Order details confirmed before dispatch</span></div><div className="flex items-start gap-2"><Truck size={16} className="mt-0.5 shrink-0 text-[#9A773F]" /><span>Delivery details confirmed with you</span></div></div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
