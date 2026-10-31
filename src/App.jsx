import About from "./components/about";
import Home from "./components/home";
import Nav from "./components/nav";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const isAbout = path === "/about";

  return (
    <>
      <Nav />
      {isAbout ? <About /> : <Home />}
    </>
  );
}
