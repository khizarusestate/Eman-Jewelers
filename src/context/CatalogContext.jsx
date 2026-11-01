import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_URL } from "./AuthContext";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        fetch(`${API_URL}/api/store/products`),
        fetch(`${API_URL}/api/store/categories`)
      ]);
      const productData = await productResponse.json();
      const categoryData = await categoryResponse.json();
      if (!productResponse.ok) throw new Error(productData.message || "Unable to load products.");
      setProducts((productData.products || []).map(p => ({ ...p, id: String(p.id || p._id) })));
      setCategories(categoryData.categories || []);
    } catch (err) {
      setError(err.message || "Unable to load the collection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);
  const value = useMemo(() => ({ products, categories, loading, error, refresh }), [products, categories, loading, error]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) throw new Error("useCatalog must be used within CatalogProvider");
  return value;
}
