import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { products, formatPrice } from "../data/products";
import { useShop } from "../context/ShopContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const saved = wishlist.map(id => products.find(product => product.id === id)).filter(Boolean);
  return <main className="min-h-screen bg-[#F7F3EA] px-4 pb-20 pt-28 text-[#17130D] sm:px-8 sm:pt-32"><div className="mx-auto max-w-6xl">
    <a href="/#collections" className="mb-7 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-widest text-[#75664E]"><ArrowLeft size={15}/> Continue shopping</a>
    <p className="text-[10px] uppercase tracking-[.3em] text-[#9A773F]">Pieces to remember</p><h1 className="mt-2 font-serif text-4xl sm:text-5xl">Your wishlist <span className="text-lg text-[#9A773F]">({saved.length})</span></h1>
    {!saved.length ? <div className="mt-10 border border-[#B98536]/25 bg-white/50 px-6 py-16 text-center"><Heart className="mx-auto text-[#9A773F]" size={30}/><h2 className="mt-4 font-serif text-2xl">Keep your favourites close</h2><p className="mt-2 text-sm text-[#756F63]">Tap the heart on a piece to save it here.</p><a href="/#collections" className="mt-6 inline-flex min-h-12 items-center justify-center bg-[#17130D] px-6 text-xs uppercase tracking-widest text-[#F8E9BE]">Discover pieces</a></div> :
    <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">{saved.map(product => <article key={product.id} className="min-w-0"><a href={`/product/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-[#EAE3D5]"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"/></a><div className="pt-3"><p className="text-[9px] uppercase tracking-widest text-[#9A773F]">{product.category}</p><a href={`/product/${product.id}`} className="mt-1 block font-serif text-base leading-snug sm:text-lg">{product.name}</a><p className="mt-2 text-xs font-semibold text-[#68481F]">{formatPrice(product.price)}</p><div className="mt-3 grid grid-cols-[1fr_auto] gap-2"><button type="button" onClick={() => addToCart(product.id)} className="inline-flex min-h-11 items-center justify-center gap-1 bg-[#17130D] px-2 text-[9px] font-semibold uppercase tracking-wider text-[#F8E9BE] sm:text-[10px]"><ShoppingBag size={13}/> Add to bag</button><button type="button" onClick={() => toggleWishlist(product.id)} aria-label={`Remove ${product.name} from wishlist`} className="grid min-h-11 min-w-11 place-items-center border border-[#B98536]/40 text-[#8A5A43]"><Trash2 size={15}/></button></div></div></article>)}</div>}
  </div></main>;
}
