// Live catalogue starts empty. Products will be loaded from the backend API.
export const products = [];
export const formatPrice = (amount) => new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(amount);
