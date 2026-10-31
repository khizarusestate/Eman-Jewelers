export const products = [
  { id: 1, name: "Celeste Diamond Ring", category: "Rings", price: 18500, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85", tag: "Bestseller" },
  { id: 2, name: "Solstice Gold Necklace", category: "Necklaces", price: 24900, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85", tag: "New arrival" },
  { id: 3, name: "Luna Pearl Earrings", category: "Earrings", price: 12800, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85", tag: "" },
  { id: 4, name: "Eternity Gold Bangle", category: "Bracelets", price: 16400, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85", tag: "Limited edit" },
  { id: 5, name: "Aurora Halo Ring", category: "Rings", price: 21500, image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=85", tag: "" },
  { id: 6, name: "Amara Layered Chain", category: "Necklaces", price: 19200, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85", tag: "Customer favourite" },
  { id: 7, name: "Golden Hour Hoops", category: "Earrings", price: 9800, image: "https://images.unsplash.com/photo-1630019852942-ab7c9ab60959?auto=format&fit=crop&w=900&q=85", tag: "" },
  { id: 8, name: "Serein Charm Bracelet", category: "Bracelets", price: 14700, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85", tag: "" },
];
export const formatPrice = (amount) => new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(amount);
