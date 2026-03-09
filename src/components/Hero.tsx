import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Rocket, Zap, Users, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─── Animated counter ─────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) { node.textContent = Math.round(v) + suffix; },
    });
    return () => controls.stop();
  }, [to, suffix]);
  return <span ref={nodeRef}>0{suffix}</span>;
}

/* ─── Orbital ring canvas ───────────────────────────────────────── */
function OrbitalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf: number;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", onMove);

    /* Particles */
    type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; hue: number };
    const particles: P[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.6 + 0.15,
      hue: Math.random() > 0.7 ? 30 : 25,  // orange variants
    }));

    /* Orbital rings config */
    const rings = [
      { radius: 140, speed: 0.004, nodeCount: 6, nodeR: 4, color: "255,106,0" },
      { radius: 195, speed: -0.003, nodeCount: 10, nodeR: 2.5, color: "255,140,56" },
      { radius: 250, speed: 0.0018, nodeCount: 14, nodeR: 2, color: "255,80,0" },
      { radius: 310, speed: -0.001, nodeCount: 18, nodeR: 1.5, color: "255,106,0" },
    ];
    let t = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2 + (mouse.current.x - W / 2) * 0.06;
      const cy = H / 2 + (mouse.current.y - H / 2) * 0.06;

      /* ── Central orb ── */
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
      grad.addColorStop(0, "rgba(255,106,0,0.35)");
      grad.addColorStop(0.4, "rgba(255,80,0,0.12)");
      grad.addColorStop(1, "rgba(255,106,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      /* inner core pulse */
      const pulse = 0.7 + 0.3 * Math.sin(t * 2);
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40 * pulse);
      coreGrad.addColorStop(0, "rgba(255,160,60,0.9)");
      coreGrad.addColorStop(0.5, "rgba(255,106,0,0.6)");
      coreGrad.addColorStop(1, "rgba(255,60,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 40 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      /* ── Rings ── */
      rings.forEach((ring) => {
        /* ring track */
        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.color},0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        /* ring nodes */
        for (let n = 0; n < ring.nodeCount; n++) {
          const angle = (n / ring.nodeCount) * Math.PI * 2 + t * ring.speed * 200;
          const nx = cx + Math.cos(angle) * ring.radius;
          const ny = cy + Math.sin(angle) * ring.radius;
          const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, ring.nodeR * 3);
          glow.addColorStop(0, `rgba(${ring.color},0.9)`);
          glow.addColorStop(1, `rgba(${ring.color},0)`);
          ctx.beginPath();
          ctx.arc(nx, ny, ring.nodeR * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(nx, ny, ring.nodeR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ring.color},1)`;
          ctx.fill();
        }
      });

      /* ── Data stream lines from core ── */
      for (let s = 0; s < 6; s++) {
        const angle = (s / 6) * Math.PI * 2 + t * 0.3;
        const len = 90 + 30 * Math.sin(t + s);
        const ex = cx + Math.cos(angle) * len;
        const ey = cy + Math.sin(angle) * len;
        const lineGrad = ctx.createLinearGradient(cx, cy, ex, ey);
        lineGrad.addColorStop(0, "rgba(255,106,0,0.6)");
        lineGrad.addColorStop(1, "rgba(255,106,0,0)");
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      /* ── Particles ── */
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,55%,${p.alpha})`;
        ctx.fill();
      });
      /* connecting lines between nearby particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,106,0,${0.1 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* ── Scan line sweep ── */
      const scanY = H * ((t * 0.5) % 1);
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0, "rgba(255,106,0,0)");
      scanGrad.addColorStop(0.5, "rgba(255,106,0,0.06)");
      scanGrad.addColorStop(1, "rgba(255,106,0,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 40, W, 80);

      t += 0.008;
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ minHeight: 500 }}
    />
  );
}

/* ─── Glitch text ───────────────────────────────────────────────── */
function GlitchWord({ children }: { children: string }) {
  return (
    <span className="relative inline-block glitch-word" data-text={children}>
      {children}
    </span>
  );
}

/* ─── Typewriter ────────────────────────────────────────────────── */
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 30);
    return () => clearTimeout(t);
  }, [started, displayed, text]);
  return (
    <span>
      {displayed}
      <span className="animate-pulse text-orange-500">|</span>
    </span>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Rocket, value: 2, suffix: "+", label: "Startups Launched" },
    { icon: Zap, value: 50, suffix: "+", label: "Innovation Events" },
    { icon: Users, value: 10000, suffix: "+", label: "Community Members" },
  ];

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* ── Layered backgrounds ── */}
      {/* Hex grid */}
      <div className="absolute inset-0 hex-grid-bg opacity-30 pointer-events-none" />
      {/* Scan lines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      {/* Ambient left glow */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[700px] bg-orange-600/8 blur-[130px] rounded-full pointer-events-none" />
      {/* Ambient right glow */}
      <div className="absolute -right-40 top-1/4 w-[400px] h-[400px] bg-orange-500/6 blur-[100px] rounded-full pointer-events-none" />
      {/* Top edge light bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ─── LEFT : Text ─────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* System label */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded border border-orange-500/40 bg-orange-500/8 text-orange-400 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                IEDC // Venture Hub
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-orange-500/40 to-transparent" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[0.95] tracking-tight mb-4"
            >
              <span className="block text-white/90">BUILD THE</span>
              <span className="block text-orange-500 glow-text glitch-line mt-1" data-text="FUTURE">
                FUTURE
              </span>
              <span className="block text-white/80 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-1">
                FROM HERE.
              </span>
            </motion.h1>

            {/* Decorative line */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 my-6">
              <div className="w-12 h-0.5 bg-orange-500" />
              <div className="w-4 h-0.5 bg-orange-500/50" />
              <div className="w-2 h-0.5 bg-orange-500/25" />
            </motion.div>

            {/* Typewriter sub */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-white/50 font-mono leading-relaxed mb-10 max-w-lg"
            >
              <Typewriter
                text="Where innovative ideas transform into successful startups. Hackathons, ideathons, mentorship & real-world startup fuel."
                delay={900}
              />
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-14">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/register")}
                className="group relative flex items-center justify-center gap-2 px-7 py-3.5 bg-orange-500 text-black font-bold rounded-lg text-base overflow-hidden"
              >
                {/* shimmer */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                Join Our Community
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white/80 font-semibold rounded-lg text-base hover:border-orange-500/60 hover:text-orange-400 hover:bg-orange-500/5 transition-all"
              >
                Explore Events
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, borderColor: "rgba(255,106,0,0.5)" }}
                  className="flex flex-col gap-1.5 p-4 rounded-xl bg-white/[0.03] border border-white/8 backdrop-blur-sm"
                >
                  <s.icon className="w-4 h-4 text-orange-500/80" />
                  <span className="text-2xl font-black text-white tabular-nums">
                    <Counter to={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-[11px] text-white/40 uppercase tracking-wider leading-tight">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT : Orbital visualization ────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Outer glow ring */}
            <div className="absolute w-[420px] h-[420px] rounded-full border border-orange-500/10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-orange-500/8 animate-[spin_20s_linear_infinite_reverse]" />

            {/* Corner brackets */}
            <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-orange-500/60" />
            <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-orange-500/60" />
            <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-orange-500/60" />
            <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-orange-500/60" />

            {/* Canvas */}
            <div className="w-[540px] h-[540px] xl:w-[600px] xl:h-[600px]">
              <OrbitalCanvas />
            </div>

            {/* Floating data cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 -right-4 px-3 py-2 rounded-lg bg-[#111]/90 border border-orange-500/30 backdrop-blur-md text-xs font-mono"
            >
              <div className="text-orange-400 mb-0.5">// startup.init()</div>
              <div className="text-white/50">status: <span className="text-green-400">LIVE</span></div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-16 -left-4 px-3 py-2 rounded-lg bg-[#111]/90 border border-orange-500/30 backdrop-blur-md text-xs font-mono"
            >
              <div className="text-orange-400 mb-0.5">venture.score</div>
              <div className="text-white font-bold text-base">98.4 <span className="text-green-400 text-xs">↑ 12%</span></div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/25 text-xs font-mono"
        >
          <span>scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
