import { useEffect, useMemo } from "react";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 61 + 7) % 100}%`,
  delay: `${(i % 8) * -0.7}s`,
  duration: `${4 + (i % 5)}s`,
  size: i % 5 === 0 ? "3px" : "2px",
}));

export default function Preloader({ visible, initial = false }) {
  const particles = useMemo(() => PARTICLES, []);

  useEffect(() => {
    if (!visible) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  return (
    <div
      aria-hidden={!visible}
      aria-label="Loading Eman Jewelers"
      role="status"
      className={`eman-loader ${visible ? "eman-loader--visible" : "eman-loader--hidden"}`}
      data-initial={initial ? "true" : "false"}
    >
      <style>{`
        .eman-loader {
          --gold: #e8c477;
          --gold-bright: #fff0bd;
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          overflow: hidden;
          isolation: isolate;
          background:
            radial-gradient(ellipse at 50% 48%, rgba(121, 79, 25, .16), transparent 34%),
            radial-gradient(ellipse at 50% 100%, rgba(94, 58, 17, .10), transparent 48%),
            #050403;
          opacity: 1;
          visibility: visible;
          transition: opacity .72s cubic-bezier(.22,1,.36,1), visibility .72s;
        }
        .eman-loader--hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .eman-loader__grain {
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: .12;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.24'/%3E%3C/svg%3E");
        }
        .eman-loader__glow {
          position: absolute;
          width: min(76vw, 660px);
          aspect-ratio: 1;
          border-radius: 50%;
          filter: blur(80px);
          opacity: .18;
          pointer-events: none;
          animation: emanGlow 5s ease-in-out infinite alternate;
        }
        .eman-loader__glow--one { background: #a56d24; transform: translate(-27%, -14%); }
        .eman-loader__glow--two { background: #e5c47b; opacity: .09; transform: translate(30%, 22%); animation-delay: -2.5s; }
        .eman-loader__stage {
          position: relative;
          display: flex;
          width: min(88vw, 430px);
          flex-direction: column;
          align-items: center;
          transform: translateY(-2vh);
        }
        .eman-loader__emblem {
          position: relative;
          display: grid;
          width: clamp(190px, 48vw, 258px);
          aspect-ratio: 1;
          place-items: center;
          margin-bottom: 34px;
        }
        .eman-loader__orbit {
          position: absolute;
          inset: 7%;
          border: 1px solid rgba(232,196,119,.19);
          border-radius: 50%;
          box-shadow: 0 0 28px rgba(194,145,62,.06), inset 0 0 25px rgba(194,145,62,.035);
        }
        .eman-loader__orbit::before,
        .eman-loader__orbit::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
        }
        .eman-loader__orbit--outer {
          inset: 0;
          border-color: rgba(232,196,119,.12);
          animation: emanSpin 18s linear infinite;
        }
        .eman-loader__orbit--outer::before {
          inset: 8px;
          border-top-color: rgba(255,240,189,.82);
          border-right-color: rgba(232,196,119,.15);
          filter: drop-shadow(0 0 5px rgba(255,222,151,.55));
        }
        .eman-loader__orbit--inner {
          inset: 15%;
          border-style: dashed;
          border-color: rgba(232,196,119,.20);
          animation: emanSpinReverse 28s linear infinite;
        }
        .eman-loader__orbit--inner::after {
          width: 6px;
          height: 6px;
          top: 13%;
          left: 12%;
          background: var(--gold-bright);
          border: 0;
          box-shadow: 0 0 12px 3px rgba(255,226,157,.72);
        }
        .eman-loader__orbit--third {
          inset: 23%;
          border-color: rgba(232,196,119,.12);
          animation: emanSpin 13s linear infinite;
        }
        .eman-loader__crosshair {
          position: absolute;
          width: 118%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(232,196,119,.16), transparent);
        }
        .eman-loader__crosshair--vertical { transform: rotate(90deg); }
        .eman-loader__logo-wrap {
          position: relative;
          display: grid;
          width: 57%;
          aspect-ratio: 1;
          place-items: center;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,226,157,.105), rgba(113,75,27,.045) 55%, transparent 72%);
          animation: emanLogoBreath 3.2s ease-in-out infinite;
        }
        .eman-loader__logo-wrap::before {
          content: "";
          position: absolute;
          inset: -8%;
          border-radius: 50%;
          border: 1px solid rgba(232,196,119,.18);
          box-shadow: 0 0 35px rgba(221,177,91,.10), inset 0 0 22px rgba(221,177,91,.06);
        }
        .eman-loader__logo {
          display: block;
          width: 78%;
          max-height: 78%;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(232,196,119,.22)) drop-shadow(0 0 28px rgba(194,145,62,.13));
        }
        .eman-loader__flare {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          pointer-events: none;
        }
        .eman-loader__flare::after {
          content: "";
          position: absolute;
          top: -25%;
          left: -70%;
          width: 42%;
          height: 150%;
          transform: rotate(28deg);
          background: linear-gradient(90deg, transparent, rgba(255,246,216,.22), rgba(255,225,160,.72), rgba(255,246,216,.18), transparent);
          filter: blur(3px);
          animation: emanSweep 3.8s ease-in-out infinite;
        }
        .eman-loader__particle {
          position: absolute;
          border-radius: 50%;
          background: #ffe7ae;
          box-shadow: 0 0 8px 2px rgba(255,218,143,.55);
          animation: emanFloat var(--duration) ease-in-out var(--delay) infinite;
        }
        .eman-loader__eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          color: rgba(232,196,119,.72);
          font: 500 9px/1.2 ui-sans-serif, system-ui, sans-serif;
          letter-spacing: .42em;
          text-transform: uppercase;
        }
        .eman-loader__eyebrow::before,
        .eman-loader__eyebrow::after {
          content: "";
          width: 25px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(232,196,119,.7));
        }
        .eman-loader__eyebrow::after { transform: rotate(180deg); }
        .eman-loader__name {
          margin: 0;
          color: #f7e5bd;
          font: 400 clamp(25px, 6vw, 34px)/1.15 Georgia, "Times New Roman", serif;
          letter-spacing: .105em;
          text-align: center;
          text-shadow: 0 0 25px rgba(232,196,119,.16);
        }
        .eman-loader__tagline {
          margin: 10px 0 0;
          color: rgba(213,194,158,.48);
          font: 400 8px/1.5 ui-sans-serif, system-ui, sans-serif;
          letter-spacing: .32em;
          text-transform: uppercase;
        }
        .eman-loader__progress {
          position: relative;
          width: min(52vw, 190px);
          height: 1px;
          margin-top: 36px;
          overflow: hidden;
          background: rgba(232,196,119,.15);
        }
        .eman-loader__progress::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 38%;
          background: linear-gradient(90deg, transparent, #fff0bd, #b98536, transparent);
          box-shadow: 0 0 9px rgba(255,226,157,.7);
          animation: emanProgress 1.65s cubic-bezier(.65,0,.35,1) infinite;
        }
        .eman-loader__loading {
          margin-top: 12px;
          color: rgba(232,196,119,.42);
          font: 500 8px/1 ui-sans-serif, system-ui, sans-serif;
          letter-spacing: .3em;
          text-transform: uppercase;
        }
        @keyframes emanSpin { to { transform: rotate(360deg); } }
        @keyframes emanSpinReverse { to { transform: rotate(-360deg); } }
        @keyframes emanLogoBreath { 0%,100% { transform: scale(.97); opacity: .88; } 50% { transform: scale(1.035); opacity: 1; } }
        @keyframes emanSweep { 0%,18% { left: -70%; opacity: 0; } 35% { opacity: 1; } 72%,100% { left: 135%; opacity: 0; } }
        @keyframes emanProgress { 0% { transform: translateX(-120%); } 100% { transform: translateX(360%); } }
        @keyframes emanFloat { 0%,100% { opacity: .12; transform: translate3d(0,8px,0) scale(.7); } 50% { opacity: .9; transform: translate3d(5px,-13px,0) scale(1.25); } }
        @keyframes emanGlow { from { opacity: .10; scale: .88; } to { opacity: .22; scale: 1.08; } }
        @media (max-width: 520px) {
          .eman-loader__stage { transform: translateY(-1vh); }
          .eman-loader__emblem { margin-bottom: 28px; }
          .eman-loader__tagline { letter-spacing: .22em; }
        }
        @media (prefers-reduced-motion: reduce) {
          .eman-loader *, .eman-loader *::before, .eman-loader *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="eman-loader__grain" />
      <div className="eman-loader__glow eman-loader__glow--one" />
      <div className="eman-loader__glow eman-loader__glow--two" />

      <div className="eman-loader__stage">
        <div className="eman-loader__emblem">
          <div className="eman-loader__orbit eman-loader__orbit--outer" />
          <div className="eman-loader__orbit eman-loader__orbit--inner" />
          <div className="eman-loader__orbit eman-loader__orbit--third" />
          <div className="eman-loader__crosshair" />
          <div className="eman-loader__crosshair eman-loader__crosshair--vertical" />
          <div className="eman-loader__logo-wrap">
            <img className="eman-loader__logo" src="/images/Logo.png" alt="Eman Jewelers" />
            <div className="eman-loader__flare" />
          </div>
          {particles.map((particle, index) => (
            <span
              key={index}
              className="eman-loader__particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                "--delay": particle.delay,
                "--duration": particle.duration,
              }}
            />
          ))}
        </div>

        <div className="eman-loader__eyebrow">An expression of elegance</div>
        <h1 className="eman-loader__name">Eman Jewelers</h1>
        <p className="eman-loader__tagline">Fine gold &amp; diamond jewellery</p>
        <div className="eman-loader__progress" />
        <span className="eman-loader__loading">Preparing your experience</span>
      </div>
    </div>
  );
}
