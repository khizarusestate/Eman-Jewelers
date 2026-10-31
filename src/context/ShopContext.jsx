import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext(null);
const readStored = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readStored("eman-cart-v1", []));
  const [wishlist, setWishlist] = useState(() => readStored("eman-wishlist-v1", []));
  useEffect(() => { try { localStorage.setItem("eman-cart-v1", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem("eman-wishlist-v1", JSON.stringify(wishlist)); } catch {} }, [wishlist]);

  const addToCart = (productId, quantity = 1) => setCart(current => {
    const id = Number(productId);
    const amount = Math.max(1, Math.min(99, Number(quantity) || 1));
    const found = current.find(item => item.id === id);
    return found
      ? current.map(item => item.id === id ? { ...item, quantity: Math.min(99, item.quantity + amount) } : item)
      : [...current, { id, quantity: amount }];
  });
  const setQuantity = (productId, quantity) => {
    const id = Number(productId);
    const amount = Math.max(0, Math.min(99, Number(quantity) || 0));
    setCart(current => amount === 0 ? current.filter(item => item.id !== id) : current.map(item => item.id === id ? { ...item, quantity: amount } : item));
  };
  const removeFromCart = id => setCart(current => current.filter(item => item.id !== Number(id)));
  const toggleWishlist = id => setWishlist(current => current.includes(Number(id)) ? current.filter(item => item !== Number(id)) : [...current, Number(id)]);
  const removeFromWishlist = id => setWishlist(current => current.filter(item => item !== Number(id)));
  const value = { cart, wishlist, addToCart, setQuantity, removeFromCart, toggleWishlist, removeFromWishlist, cartCount: cart.reduce((sum, item) => sum + item.quantity, 0) };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
}
