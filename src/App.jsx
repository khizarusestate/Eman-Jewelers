import { useEffect, useRef, useState } from "react";
import About from "./components/about";
import Collection from "./components/Collection";
import Home from "./components/home";
import Nav from "./components/nav";
import Preloader from "./components/preloader";
import AuthPage from "./pages/AuthPage";
import Account from "./pages/Account";
import ProductDetails from "./pages/ProductDetails";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/ToastProvider";

const normalizePath = pathname => pathname.replace(/\/+$/, "") || "/";
const ROUTES = new Set(["/", "/about", "/login", "/register", "/account"]);
const isKnownRoute = pathname => ROUTES.has(pathname) || /^\/product\/\d+$/.test(pathname);

function AppContent() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [loading, setLoading] = useState(true);
  const transitionTimer = useRef(null);

  useEffect(() => {
    transitionTimer.current = window.setTimeout(() => setLoading(false), 1750);
    return () => window.clearTimeout(transitionTimer.current);
  }, []);

  useEffect(() => {
    const finishTransition = (delay, hash = "") => {
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(() => {
        setLoading(false);
        if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, delay);
    };
    const handleNavigation = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      const nextPath = normalizePath(destination.pathname);
      if (!isKnownRoute(nextPath)) return;
      if (nextPath === path && !destination.hash) return;
      event.preventDefault();
      window.history.pushState({}, "", destination.pathname + destination.search + destination.hash);
      setPath(nextPath);
      if (nextPath !== path) {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "instant" });
        finishTransition(850, destination.hash);
      } else if (destination.hash) {
        document.getElementById(decodeURIComponent(destination.hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
      }
    };
    const handleBackForward = () => {
      const nextPath = normalizePath(window.location.pathname);
      if (!isKnownRoute(nextPath)) return;
      setPath(nextPath);
      if (nextPath !== path) {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "instant" });
        finishTransition(750, window.location.hash);
      }
    };
    document.addEventListener("click", handleNavigation);
    window.addEventListener("popstate", handleBackForward);
    return () => {
      document.removeEventListener("click", handleNavigation);
      window.removeEventListener("popstate", handleBackForward);
    };
  }, [path]);

  const productMatch = path.match(/^\/product\/(\d+)$/);
  const page = productMatch ? <ProductDetails productId={Number(productMatch[1])} /> : path === "/about" ? <About /> : path === "/login" ? <AuthPage mode="login" /> : path === "/register" ? <AuthPage mode="register" /> : path === "/account" ? <Account /> : <><Home /><Collection /></>;

  return <>
    <Nav />
    {page}
    <Preloader visible={loading} />
  </>;
}

export default function App() {
  return <AuthProvider><ToastProvider><AppContent /></ToastProvider></AuthProvider>;
}
