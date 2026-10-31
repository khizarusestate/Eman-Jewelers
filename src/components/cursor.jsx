import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];
const PALETTE = ["#FFF1B8", "#F1C965", "#F1C965", "#CD9135", "#BB7B24"];
const INTERACTIVE =
    'a, button, [role="button"], input, textarea, select, summary, label[for], [data-cursor="hover"]';
const MAX_PARTICLES = 170;

/* Four-point sparkle path */
function starPath(ctx, x, y, r) {
    const ir = r * 0.28;
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + ir, y - ir);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x + ir, y + ir);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - ir, y + ir);
    ctx.lineTo(x - r, y);
    ctx.lineTo(x - ir, y - ir);
    ctx.closePath();
}

export default function Cursor() {
    const reduce = useReducedMotion();
    const canvasRef = useRef(null);

    const [enabled, setEnabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [pressed, setPressed] = useState(false);

    /* Raw pointer + two layers of spring lag (ring, aura) */
    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
    const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
    const auraX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.9 });
    const auraY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.9 });

    /* Only on devices with a real mouse */
    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        const sync = () => setEnabled(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
        if (!enabled) return undefined;

        const root = document.documentElement;
        root.classList.add("has-custom-cursor");

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        const particles = [];
        let raf = 0;
        let last = 0;
        let lx = null;
        let ly = null;

        const spawn = (px, py, burst) => {
            if (particles.length >= MAX_PARTICLES) particles.shift();
            const angle = Math.random() * Math.PI * 2;
            const drift = burst ? 0.6 + Math.random() * 1.9 : Math.random() * 0.35;
            particles.push({
                x: px + (burst ? 0 : (Math.random() - 0.5) * 6),
                y: py + (burst ? 0 : (Math.random() - 0.5) * 6),
                vx: Math.cos(angle) * drift,
                vy: Math.sin(angle) * drift + (burst ? 0 : 0.12 + Math.random() * 0.35),
                size: burst ? 1.2 + Math.random() * 2.4 : 0.8 + Math.random() * 2,
                life: 0,
                ttl: burst ? 700 + Math.random() * 600 : 800 + Math.random() * 900,
                color: PALETTE[(Math.random() * PALETTE.length) | 0],
                star: Math.random() < (burst ? 0.5 : 0.2),
                tw: Math.random() * Math.PI * 2,
            });
        };

        const frame = (now) => {
            const dt = Math.min(now - last, 50) || 16;
            last = now;
            const k = dt / 16.67;

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.globalCompositeOperation = "lighter";

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life += dt;
                if (p.life >= p.ttl) {
                    particles.splice(i, 1);
                    continue;
                }

                const damp = Math.pow(0.985, k);
                p.vx *= damp;
                p.vy = p.vy * damp + 0.004 * k;
                p.x += p.vx * k;
                p.y += p.vy * k;

                const t = p.life / p.ttl;
                const twinkle = 0.75 + 0.25 * Math.sin(p.tw + p.life * 0.012);
                const s = p.size * (1 - t * 0.5);

                ctx.globalAlpha = Math.max((1 - t) * (1 - t) * twinkle, 0);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = p.star ? 10 : 7;
                ctx.beginPath();
                if (p.star) starPath(ctx, p.x, p.y, s * 2.6);
                else ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            raf = particles.length ? requestAnimationFrame(frame) : 0;
        };

        const kick = () => {
            if (raf) return;
            last = performance.now();
            raf = requestAnimationFrame(frame);
        };

        const onMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
            setVisible(true);

            if (reduce) return;

            if (lx === null) {
                lx = e.clientX;
                ly = e.clientY;
                return;
            }

            const dx = e.clientX - lx;
            const dy = e.clientY - ly;
            const steps = Math.min(Math.floor(Math.hypot(dx, dy) / 9), 8);
            if (steps > 0) {
                for (let i = 1; i <= steps; i++) {
                    const t = i / steps;
                    spawn(lx + dx * t, ly + dy * t, false);
                }
                lx = e.clientX;
                ly = e.clientY;
                kick();
            }
        };

        const onOver = (e) => {
            setHovering(e.target instanceof Element && !!e.target.closest(INTERACTIVE));
        };

        const onDown = (e) => {
            setPressed(true);
            if (reduce) return;
            for (let i = 0; i < 14; i++) spawn(e.clientX, e.clientY, true);
            kick();
        };

        const onUp = () => setPressed(false);
        const onLeave = () => {
            setVisible(false);
            setPressed(false);
            lx = null;
            ly = null;
        };
        const onEnter = () => setVisible(true);

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        root.addEventListener("mouseleave", onLeave);
        root.addEventListener("mouseenter", onEnter);

        return () => {
            cancelAnimationFrame(raf);
            root.classList.remove("has-custom-cursor");
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            root.removeEventListener("mouseleave", onLeave);
            root.removeEventListener("mouseenter", onEnter);
        };
    }, [enabled, reduce, x, y]);

    if (!enabled) return null;

    return (
        <>
            {/* Golden dust trail */}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-[9997] h-full w-full"
            />

            {/* Aura */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9998]"
                style={{ x: auraX, y: auraY }}
            >
                <motion.div
                    animate={{
                        opacity: visible ? (hovering ? 1 : 0.8) : 0,
                        scale: pressed ? 0.8 : hovering ? 1.6 : 1,
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{
                        width: 140,
                        height: 140,
                        marginLeft: -70,
                        marginTop: -70,
                        borderRadius: "9999px",
                        background:
                            "radial-gradient(circle, rgba(241,201,101,0.32) 0%, rgba(187,123,36,0.15) 38%, transparent 70%)",
                        mixBlendMode: "screen",
                        filter: "blur(6px)",
                    }}
                />
            </motion.div>

            {/* Ring */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999]"
                style={{ x: ringX, y: ringY }}
            >
                <motion.div
                    animate={{
                        opacity: visible ? 1 : 0,
                        scale: pressed ? 0.8 : hovering ? 1.7 : 1,
                        backgroundColor: hovering ? "rgba(241,201,101,0.09)" : "rgba(241,201,101,0)",
                        borderColor: hovering ? "rgba(255,241,184,0.95)" : "rgba(241,201,101,0.6)",
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{
                        width: 36,
                        height: 36,
                        marginLeft: -18,
                        marginTop: -18,
                        borderRadius: "9999px",
                        borderWidth: 1,
                        borderStyle: "solid",
                        boxShadow:
                            "0 0 18px rgba(241,201,101,0.28), inset 0 0 12px rgba(187,123,36,0.18)",
                    }}
                />
            </motion.div>

            {/* Core diamond */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[10000]"
                style={{ x, y }}
            >
                <motion.div
                    animate={{
                        opacity: visible ? 1 : 0,
                        rotate: hovering ? 135 : 45,
                        scale: pressed ? 0.7 : hovering ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{
                        width: 8,
                        height: 8,
                        marginLeft: -4,
                        marginTop: -4,
                        background: "linear-gradient(135deg, #FFF1B8, #F1C965 55%, #BB7B24)",
                        boxShadow:
                            "0 0 10px 2px rgba(255,241,184,0.85), 0 0 22px 4px rgba(241,201,101,0.45)",
                    }}
                />
            </motion.div>
        </>
    );
}
