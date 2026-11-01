import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { formatPrice } from "../data/products";
import { useShop } from "../context/ShopContext";
import { useCatalog } from "../context/CatalogContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";

export default function Cart() {
  const { cart, setQuantity, removeFromCart } = useShop();
  const { products } = useCatalog();
  const { user, request } = useAuth();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [delivery, setDelivery] = useState({ phone: user?.phone || "", address: user?.address || "", city: user?.city || "", country: user?.country || "Pakistan" });
  const lines = cart.map(line => ({ ...line, product: products.find(product => String(product.id) === String(line.id)) })).filter(line => line.product);
  const total = useMemo(() => lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0), [lines]);
  const placeOrder = async e => {
    e.preventDefault();
    if (!user) { window.location.assign("/login"); return; }
    setBusy(true);
    try {
      const result = await request("/api/store/orders", { method: "POST", body: JSON.stringify({ items: lines.map(line => ({ productId: line.product.id, quantity: line.quantity })), delivery }) });
      const order = result.order;
      const message = [
        "Assalam-o-Alaikum, I have placed an order at Eman Jewelers.",
        `Order: ${order.orderNumber}`,
        ...order.items.map(item => `${item.name} × ${item.quantity} — ${formatPrice(item.lineTotal)}`),
        `Total: ${formatPrice(order.total)}`,
        `Name: ${user.name}`,
        `Phone: ${delivery.phone}`,
        `Address: ${delivery.address}, ${delivery.city}, ${delivery.country}`,
        "Please confirm my order and delivery."
      ].join("\n");
      localStorage.setItem("eman-cart-v1", "[]");
      window.dispatchEvent(new Event("eman-cart-cleared"));
      toast("Order saved. Opening WhatsApp…", "success");
      const whatsappUrl = `https://wa.me/923177348178?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    } catch (error) { toast(error.message, "error"); }
    finally { setBusy(false); }
  };

  return <main className="min-h-screen bg-[#F7F3EA] px-4 pb-20 pt-28 text-[#17130D] sm:px-8 sm:pt-32"><div className="mx-auto max-w-5xl">
    <a href="/#collections" className="mb-7 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-widest text-[#75664E]"><ArrowLeft size={15}/> Continue shopping</a>
    <p className="text-[10px] uppercase tracking-[.3em] text-[#9A773F]">Your selection</p>
    <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Shopping bag <span className="text-lg text-[#9A773F]">({lines.reduce((sum,line)=>sum+line.quantity,0)})</span></h1>
    {!lines.length ? <div className="mt-10 border border-[#B98536]/25 bg-white/50 px-6 py-16 text-center"><ShoppingBag className="mx-auto text-[#9A773F]" size={30}/><h2 className="mt-4 font-serif text-2xl">Your bag is waiting</h2><p className="mt-2 text-sm text-[#756F63]">Add a piece from the collection to see it here.</p><a href="/#collections" className="mt-6 inline-flex min-h-12 items-center justify-center bg-[#17130D] px-6 text-xs uppercase tracking-widest text-[#F8E9BE]">Explore collection</a></div> :
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="divide-y divide-[#B98536]/25 border-y border-[#B98536]/25">{lines.map(({id,quantity,product})=><article key={id} className="flex gap-4 py-5 sm:gap-6"><a href={`/product/${id}`} className="h-32 w-24 shrink-0 overflow-hidden bg-[#EAE3D5] sm:h-40 sm:w-32"><img src={product.image} alt={product.name} className="h-full w-full object-cover"/></a><div className="flex min-w-0 flex-1 flex-col"><p className="text-[9px] uppercase tracking-widest text-[#9A773F]">{product.category}</p><a href={`/product/${id}`} className="mt-1 font-serif text-lg leading-snug sm:text-xl">{product.name}</a><p className="mt-2 text-sm font-semibold text-[#68481F]">{formatPrice(product.price)}</p><div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3"><div className="flex h-10 items-center border border-[#C9BDA7] bg-white/60"><button type="button" disabled={quantity<=1} onClick={()=>setQuantity(id,quantity-1)} className="grid h-9 w-9 place-items-center"><Minus size={13}/></button><span className="w-8 text-center text-sm">{quantity}</span><button type="button" disabled={quantity>=99} onClick={()=>setQuantity(id,quantity+1)} className="grid h-9 w-9 place-items-center"><Plus size={13}/></button></div><button type="button" onClick={()=>removeFromCart(id)} className="inline-flex min-h-10 items-center gap-1 text-xs text-[#8A5A43]"><Trash2 size={14}/> Remove</button></div></div></article>)}</div>
      <aside className="h-fit border border-[#B98536]/30 bg-white/50 p-5 sm:p-6"><h2 className="font-serif text-2xl">Delivery & checkout</h2><div className="mt-5 flex justify-between text-sm"><span className="text-[#75664E]">Subtotal</span><strong>{formatPrice(total)}</strong></div><p className="mt-2 text-xs leading-5 text-[#8A806F]">Final prices are verified by the server when you place the order.</p>
        {!user ? <div className="mt-6 rounded-lg border border-[#B98536]/30 bg-white/70 p-4"><p className="text-sm">Sign in to save your order to your account and continue to WhatsApp.</p><a href="/login" className="mt-4 flex min-h-11 items-center justify-center bg-[#17130D] text-xs uppercase tracking-widest text-[#F8E9BE]">Sign in to checkout</a></div> :
        <form onSubmit={placeOrder} className="mt-6 space-y-3">{[["phone","Phone number"],["address","Full delivery address"],["city","City"],["country","Country"]].map(([key,label])=><label key={key} className="block"><span className="mb-1 block text-[9px] uppercase tracking-widest text-[#75664E]">{label}</span><input required value={delivery[key]} onChange={e=>setDelivery({...delivery,[key]:e.target.value})} className="w-full border border-[#C9BDA7] bg-white/80 px-3 py-3 text-sm outline-none focus:border-[#9A773F]"/></label>)}<button disabled={busy} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 bg-[#17130D] px-4 text-[10px] font-semibold uppercase tracking-widest text-[#F8E9BE] disabled:opacity-60"><MessageCircle size={16}/>{busy?"Saving order…":"Place order & continue to WhatsApp"}</button></form>}
        <div className="my-5 h-px bg-[#B98536]/25"/><p className="text-[10px] leading-5 text-[#8A806F]">Your order is stored in your account and made available to the store administrator. WhatsApp opens after the order is saved.</p>
      </aside>
    </div>}
  </div></main>;
}
