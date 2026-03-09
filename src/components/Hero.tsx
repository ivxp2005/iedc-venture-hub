import React, { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { ArrowRight, Rocket, Zap, Users, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Prism from "./Prism";

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
      {/* Prism WebGL background */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.55 }}>
        <Prism
          height={3.5}
          baseWidth={5.5}
          animationType="rotate"
          glow={1}
          noise={0}
          transparent
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          hoverStrength={2}
          inertia={0.05}
          bloom={1}
          timeScale={0.5}
        />
      </div>
      {/* Scan lines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      {/* Dark centre vignette so text stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a_80%)] pointer-events-none" />
      {/* Top edge light bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* System label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8 justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded border border-orange-500/40 bg-orange-500/8 text-orange-400 text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              IEDC // Venture Hub
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] font-black leading-[0.95] tracking-tight mb-4"
          >
            <span className="block text-white/90">BUILD THE</span>
            <span className="block text-orange-500 glow-text glitch-line mt-1" data-text="FUTURE">
              FUTURE
            </span>
            <span className="block text-white/80 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mt-1">
              FROM HERE.
            </span>
          </motion.h1>

          {/* Decorative line */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 my-6">
            <div className="w-2 h-0.5 bg-orange-500/25" />
            <div className="w-4 h-0.5 bg-orange-500/50" />
            <div className="w-12 h-0.5 bg-orange-500" />
            <div className="w-4 h-0.5 bg-orange-500/50" />
            <div className="w-2 h-0.5 bg-orange-500/25" />
          </motion.div>

          {/* Typewriter sub */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-white/50 font-mono leading-relaxed mb-10 max-w-2xl"
          >
            <Typewriter
              text="Where innovative ideas transform into successful startups. Hackathons, ideathons, mentorship & real-world startup fuel."
              delay={900}
            />
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/register")}
              className="group relative flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-black font-bold rounded-lg text-base overflow-hidden"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
              Join Our Community
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center justify-center gap-2 px-8 py-3.5 border border-white/15 text-white/80 font-semibold rounded-lg text-base hover:border-orange-500/60 hover:text-orange-400 hover:bg-orange-500/5 transition-all"
            >
              Explore Events
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 max-w-xl w-full">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, borderColor: "rgba(255,106,0,0.5)" }}
                className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white/[0.03] border border-white/8 backdrop-blur-sm"
              >
                <s.icon className="w-4 h-4 text-orange-500/80" />
                <span className="text-2xl font-black text-white tabular-nums">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
                <span className="text-[11px] text-white/40 uppercase tracking-wider leading-tight text-center">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

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
