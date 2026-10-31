import { useEffect, useState } from "react";
import About from "./components/about";
import Home from "./components/home";
import Nav from "./components/nav";
import Preloader from "./components/preloader";

const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";
const ROUTES = new Set(["/", "/about"]);

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1750);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleNavigation = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const link = event.target.closest?.("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const nextPath = normalizePath(destination.pathname);
      if (!ROUTES.has(nextPath) || nextPath === path) return;

      event.preventDefault();
      window.history.pushState({}, "", destination.pathname + destination.search + destination.hash);
      setPath(nextPath);
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "instant" });

      window.setTimeout(() => {
        setLoading(false);
        if (destination.hash) {
          const section = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
          section?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 1250);
    };

    const handleBackForward = () => {
      const nextPath = normalizePath(window.location.pathname);
      if (!ROUTES.has(nextPath) || nextPath === path) return;
      setPath(nextPath);
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "instant" });
      window.setTimeout(() => setLoading(false), 1050);
    };

    document.addEventListener("click", handleNavigation);
    window.addEventListener("popstate", handleBackForward);
    return () => {
      document.removeEventListener("click", handleNavigation);
      window.removeEventListener("popstate", handleBackForward);
    };
  }, [path]);

  return (
    <>
      <Nav />
      {path === "/about" ? <About /> : <Home />}
      <Preloader visible={loading} />
    </>
  );
}
