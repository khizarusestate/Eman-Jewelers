import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus, Share2, ShieldCheck, Truck, ShoppingBag } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useCatalog } from "../context/CatalogContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";
import { formatPrice } from "../data/products";

export default function ProductDetails({ productId }) {
  const { products, loading } = useCatalog();
  const product = products.find(item => String(item.id) === String(productId));
  const { addToCart, toggleWishlist, wishlist, cart } = useShop();
  const { user, request } = useAuth();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);
  const reduceMotion = useReducedMotion();
  const cartLine = product ? cart.find(item => String(item.id) === String(product.id)) : undefined;
  const isWishlisted = product ? wishlist.some(id => String(id) === String(product.id)) : false;
  const total = useMemo(() => (product?.price || 0) * quantity, [product, quantity]);
  useEffect(() => {
    if (!product) return;
    const title = `${product.name} | Eman Jewelers`;
    const description = String(product.description || `Discover ${product.name} at Eman Jewelers.`).replace(/\\s+/g, " ").slice(0, 155);
    document.title = title;
    const setMeta = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, selector.includes("property=") ? selector.match(/property="([^"]+)"/)[1] : selector.match(/name="([^"]+)"/)[1]);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    setMeta('meta[name="description"]', "name", description);
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:type"]', "property", "product");
    setMeta('meta[property="og:image"]', "property", product.image || "");
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `https://emanjewelers.vercel.app/product/${product.id}`;
    let schema = document.getElementById("product-jsonld");
    if (!schema) { schema = document.createElement("script"); schema.id = "product-jsonld"; schema.type = "application/ld+json"; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description,
      image: product.image ? [product.image] : undefined,
      category: product.category,
      offers: {
        "@type": "Offer",
        priceCurrency: "PKR",
        price: Number(product.price || 0),
        availability: "https://schema.org/InStock",
        url: canonical.href
      }
    });
    return () => { document.getElementById("product-jsonld")?.remove(); };
  }, [product]);


  const handleOrder = async () => {
    if (!user) { window.location.assign("/login"); return; }
    if (!user.phone || !user.address || !user.city) { toast("Please add your phone, delivery address and city in My Account first.", "error"); window.location.assign("/account"); return; }
    setBusy(true);
    try {
      const result = await request("/api/store/orders", { method: "POST", body: JSON.stringify({ items: [{ productId: product.id, quantity }] }) });
      const order = result.order;
      const message = [
        "Assalam-o-Alaikum, I have placed an order at Eman Jewelers.",
        `Order: ${order.orderNumber}`,
        `Product: ${product.name}`,
        `Quantity: ${quantity}`,
        `Total: ${formatPrice(order.total)}`,
        `Name: ${user.name}`,
        `Phone: ${user.phone}`,
        `Address: ${user.address}, ${user.city}`,
        "Please confirm availability and delivery."
      ].join("\\n");
      toast("Order saved successfully. Opening WhatsApp…", "success");
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    } catch (error) { toast(error.message, "error"); }
    finally { setBusy(false); }
  };

  if (loading) return <main className="min-h-[75vh] bg-[#F7F3EA] px-6 py-40 text-center text-[#68481F]">Loading product…</main>;
  if (!product) return <main className="min-h-[75vh] bg-[#F7F3EA] px-6 py-32 text-center text-[#17130D]"><h1 className="font-serif text-4xl">Piece not found</h1><a href="/#collections" className="mt-6 inline-flex border border-[#9B7B46] px-6 py-3 text-xs uppercase tracking-widest">Back to collection</a></main>;

  return <main className="min-h-screen overflow-hidden bg-[#F7F3EA] pb-16 pt-28 text-[#17130D] sm:pt-32">
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
      <a href="/#collections" className="mb-7 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#75664E]"><ArrowLeft size={15}/> Back to collection</a>
      <div className="grid items-start gap-8 md:gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
        <motion.div initial={reduceMotion?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} className="relative overflow-hidden border border-[#B98536]/70 bg-[#EAE3D5] p-[5px] shadow-xl">
          <div className="relative overflow-hidden"><span className="absolute left-3 top-3 z-10 border border-[#B98536]/30 bg-[#F7F3EA]/90 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-[#78531F]">{product.category}</span><button type="button" onClick={()=>toggleWishlist(product.id)} aria-label="Toggle wishlist" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-[#F7F3EA]/90 text-[#68481F]"><Heart size={18} fill={isWishlisted?"currentColor":"none"}/></button><img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"/></div>
          <div className="flex justify-between border-t border-[#B98536]/25 bg-gradient-to-r from-[#F7F3EA] via-[#FFF9EA] to-[#F0E3C9] px-4 py-3 text-[9px] uppercase tracking-[0.15em] text-[#82745D]"><span>Signature collection</span><span>Made to be treasured</span></div>
        </motion.div>
        <motion.section initial={reduceMotion?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} className="lg:sticky lg:top-28">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A773F]">Eman Jewelers · Signature collection</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-[-.035em] sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-sm leading-7 text-[#756F63]">{product.description}</p>
          <p className="mt-6 text-2xl font-medium tracking-wide text-[#68481F]">{formatPrice(product.price)} <span className="text-xs font-normal text-[#8A806F]">/ piece</span></p>
          <div className="my-7 h-px bg-[#B98536]/30"/>
          <div className="space-y-5 text-sm"><div><p className="mb-1 text-[10px] uppercase tracking-[.18em] text-[#9A773F]">Details</p><p className="text-[#5F584D]">{product.material || "Crafted with care"}</p></div><div><p className="mb-1 text-[10px] uppercase tracking-[.18em] text-[#9A773F]">Care instructions</p><p className="leading-6 text-[#5F584D]">{product.care || "Keep away from chemicals and store carefully when not in use."}</p></div></div>
          <div className="mt-8 border-y border-[#B98536]/30 py-5"><div className="flex flex-wrap items-center justify-between gap-4"><label htmlFor="piece-quantity" className="text-[10px] uppercase tracking-[.18em] text-[#75664E]">Number of pieces</label><div className="flex items-center border border-[#C9BDA7] bg-white/60"><button type="button" onClick={()=>setQuantity(v=>Math.max(1,v-1))} disabled={quantity<=1} className="grid h-11 w-11 place-items-center"><Minus size={15}/></button><input id="piece-quantity" type="number" min="1" max="99" value={quantity} onChange={e=>setQuantity(Math.max(1,Math.min(99,Number(e.target.value)||1)))} className="h-11 w-14 border-x border-[#C9BDA7] bg-transparent text-center text-sm outline-none"/><button type="button" onClick={()=>setQuantity(v=>Math.min(99,v+1))} disabled={quantity>=99} className="grid h-11 w-11 place-items-center"><Plus size={15}/></button></div></div><div className="mt-5 flex items-end justify-between"><span className="text-[10px] uppercase tracking-[.18em] text-[#75664E]">Total price</span><strong className="font-serif text-2xl text-[#68481F]">{formatPrice(total)}</strong></div></div>
          <div className="mt-6 grid grid-cols-[1fr_auto] gap-3"><button type="button" onClick={()=>{addToCart(product.id,quantity);setAdded(true);}} className="flex min-h-14 items-center justify-center gap-2 border border-[#B98536]/50 bg-white/50 px-3 text-[10px] font-semibold uppercase tracking-[.15em]"><ShoppingBag size={16}/>{added?"Added to bag":cartLine?"Add more":"Add to bag"}</button><button type="button" onClick={()=>toggleWishlist(product.id)} aria-label="Toggle wishlist" className="grid min-h-14 min-w-14 place-items-center border border-[#B98536]/50 text-[#68481F]"><Heart size={19} fill={isWishlisted?"currentColor":"none"}/></button></div>
          <button type="button" disabled={busy} onClick={handleOrder} className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 bg-[#17130D] px-6 py-4 text-[10px] font-semibold uppercase tracking-[.22em] text-[#F8E9BE] disabled:opacity-60"><Share2 size={16}/>{busy?"Saving order…":"Order via WhatsApp"}</button>
          <div className="mt-4 grid grid-cols-2 gap-3 text-[10px] leading-5 text-[#7D7465]"><div className="flex items-start gap-2"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#9A773F]"/><span>Order saved securely before WhatsApp</span></div><div className="flex items-start gap-2"><Truck size={16} className="mt-0.5 shrink-0 text-[#9A773F]"/><span>Delivery details confirmed with you</span></div></div>
        </motion.section>
      </div>
    </div>
  </main>;
}
