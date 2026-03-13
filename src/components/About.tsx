import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Award, Globe, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

import img1 from '../assets/images/eve1.jpg';
import img2 from '../assets/images/eve2.jpg';
import img3 from '../assets/images/eve3.jpg';
import img4 from '../assets/images/eve4.jpg';
import img5 from '../assets/images/IMG_7368.jpg';
import img6 from '../assets/images/IMG_7374.jpg';
import img7 from '../assets/images/IMG_7370.jpg';
import img8 from '../assets/images/IMG_7454.jpg';

/* ─── Animated counter ──────────────────────────────────────────── */
import { animate } from 'framer-motion';
function Counter({ to, suffix = "" }: { to: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof to === 'string') { node.textContent = to; return; }
    const ctrl = animate(0, to, {
      duration: 2, ease: "easeOut",
      onUpdate: (v) => { node.textContent = Math.round(v) + suffix; },
    });
    return () => ctrl.stop();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Cylinder Carousel ─────────────────────────────────────────── */
// Use only confirmed-working images; duplicates fill slots until real photos are added
const IMAGES = [
  img5, img2, img3, img6, img7, img8, img2, img3,
];

const TOTAL = IMAGES.length;
const CARD_W = 260;
const CARD_H = 195;
const RADIUS = 340;
const ANGLE  = 360 / TOTAL;

function RoundCarousel({ theme }: { theme: 'dark' | 'light' }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive(p => (p + 1) % TOTAL), []);
  const prev = useCallback(() => setActive(p => (p - 1 + TOTAL) % TOTAL), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3200);
    return () => clearInterval(t);
  }, [paused, next]);

  /* How far each card is from the front (0 = front, up to TOTAL/2 = back) */
  const dist = (i: number) => {
    const d = ((i - active) % TOTAL + TOTAL) % TOTAL;
    return Math.min(d, TOTAL - d);
  };

  return (
    <div
      className="relative flex flex-col items-center select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Perspective viewport */}
      <div
        style={{
          width: `${CARD_W}px`,
          height: `${CARD_H + 48}px`,
          perspective: '1100px',
          perspectiveOrigin: '50% 50%',
          overflow: 'visible',
        }}
      >
        {/* The cylinder — only this rotates */}
        <div
          style={{
            width: `${CARD_W}px`,
            height: `${CARD_H}px`,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `rotateY(${-active * ANGLE}deg)`,
            transition: 'transform 0.75s cubic-bezier(0.32, 0.72, 0, 1)',
            willChange: 'transform',
          }}
        >
          {IMAGES.map((img, i) => {
            const d = dist(i);
            const isActive = d === 0;
            // Opacity: keep side cards dimmer in light theme to avoid white washout
            const opacity = theme === 'light'
              ? [1, 0.42, 0.2, 0.1, 0.06][Math.min(d, 4)]
              : [1, 0.55, 0.28, 0.12, 0.08][Math.min(d, 4)];
            // Glass tint strength
            const tint = isActive
              ? (theme === 'light' ? 0.2 : 0)
              : Math.min(d * (theme === 'light' ? 0.28 : 0.22), 0.78);
            const exposureGuard = theme === 'light'
              ? (isActive ? 0.12 : Math.min(0.18 + d * 0.08, 0.34))
              : 0;

            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  position: 'absolute',
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    opacity,
                    transition: 'opacity 0.5s ease, box-shadow 0.5s ease',
                    boxShadow: isActive
                      ? theme === 'light'
                        ? '0 0 28px rgba(255,106,0,0.18), 0 0 0 1.5px rgba(255,106,0,0.45)'
                        : '0 0 48px rgba(255,106,0,0.4), 0 0 0 1.5px rgba(255,106,0,0.55)'
                      : theme === 'light'
                        ? '0 0 0 1px rgba(0,0,0,0.08)'
                        : '0 0 0 1px rgba(255,255,255,0.07)',
                  }}
                >
                  <img
                    src={img}
                    alt="IEDC event"
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (!el.dataset.fallback) {
                        el.dataset.fallback = '1';
                        el.src = img8;
                      }
                    }}
                  />

                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, rgba(0,0,0,${tint}) 0%, rgba(0,0,0,${Math.min(tint + 0.4, 0.88)}) 100%)`,
                    }}
                  />

                  {theme === 'light' && (
                    <div
                      className="absolute inset-0"
                      style={{ background: `rgba(0,0,0,${exposureGuard})` }}
                    />
                  )}

                  {/* Glass shimmer on non-active */}
                  {!isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: theme === 'light'
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 60%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 60%)',
                        backdropFilter: d === 1 ? 'blur(1px)' : 'none',
                      }}
                    />
                  )}

                  {/* Corner brackets on active */}
                  {isActive && (
                    <>
                      <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-orange-500/80" />
                      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-orange-500/80" />
                      <div className="absolute bottom-8 left-2 w-5 h-5 border-b-2 border-l-2 border-orange-500/80" />
                      <div className="absolute bottom-8 right-2 w-5 h-5 border-b-2 border-r-2 border-orange-500/80" />
                    </>
                  )}


                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5 mt-4">
        <button
          onClick={prev}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:border-orange-500/60 hover:text-orange-400 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active ? 'w-6 h-2 bg-orange-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:border-orange-500/60 hover:text-orange-400 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="mt-2 text-[11px] font-mono text-white/25 tracking-widest">
        {String(active + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </p>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
const About = () => {
  const { theme } = useTheme();
  const features = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering students to transform innovative ideas into successful ventures through mentorship and resources."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Recognized nationally for our contribution to the startup ecosystem and entrepreneurship education."
    },
    {
      icon: Globe,
      title: "Network",
      description: "Connect with industry experts, successful entrepreneurs, and like-minded innovators."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge programs, workshops, and events that spark creativity and entrepreneurial thinking."
    }
  ];

  const stats = [
    { value: 2,   suffix: "",    label: "Startups Incubated" },
    { value: "₹50k+", suffix: "", label: "Funding Facilitated" },
    { value: 85,  suffix: "%",   label: "Success Rate" },
    { value: 50,  suffix: "+",   label: "Industry Partners" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="about" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 hex-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scanlines pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-orange-600/6 blur-[100px] pointer-events-none" />
      {/* Top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded border border-orange-500/40 bg-orange-500/8 text-orange-400 text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              IEDC // About
            </span>
            <span className="h-px flex-1 max-w-xs bg-gradient-to-r from-orange-500/40 to-transparent" />
          </div>

          <h2 className="text-4xl lg:text-6xl font-black leading-[0.95] tracking-tight">
            <span className="text-white/90">WHO</span>{" "}
            <span className="text-orange-500 glitch-line" data-text="WE ARE">WE ARE</span>
          </h2>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-0.5 bg-orange-500" />
            <div className="w-4 h-0.5 bg-orange-500/40" />
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-28">

          {/* LEFT: text + stats */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-8"
          >
            <p className="text-white/55 text-lg leading-relaxed font-light">
              Since our inception, IEDC has been at the forefront of promoting entrepreneurship
              and innovation. We provide a comprehensive ecosystem that includes
              mentorship, funding opportunities, workspace, and deep industry connections.
            </p>
            <p className="text-white/55 text-lg leading-relaxed font-light">
              Our programs bridge the gap between academic learning and real-world
              business challenges — ensuring students are equipped to launch ventures that matter.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-2 py-2">
              <div className="h-px flex-1 bg-white/8" />
              <span className="text-xs font-mono text-orange-500/60 tracking-widest">IMPACT.METRICS</span>
              <div className="h-px flex-1 bg-white/8" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -3, borderColor: 'rgba(255,106,0,0.45)' }}
                  className="relative overflow-hidden p-5 rounded-xl bg-white/[0.03] border border-white/8 group transition-all"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-orange-500/20 group-hover:border-orange-500/50 transition-colors rounded-bl-xl" />
                  <p className="text-2xl font-black text-orange-400 mb-1 tabular-nums">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-white/45 text-xs uppercase tracking-wider font-mono">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Circular Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <RoundCarousel theme={theme} />
          </motion.div>
        </div>

        {/* ── Feature cards ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-xl bg-white/[0.03] border border-white/8 hover:border-orange-500/40 transition-all overflow-hidden"
            >
              {/* top-right glow */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-orange-500/0 group-hover:bg-orange-500/10 blur-xl transition-all duration-500" />
              {/* corner bracket */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-orange-500/0 group-hover:border-orange-500/50 transition-colors" />

              <div className="w-11 h-11 rounded-lg bg-orange-500/8 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/18 group-hover:border-orange-500/40 transition-all">
                <feature.icon className="w-5 h-5 text-orange-400" />
              </div>
              <div className="w-4 h-0.5 bg-orange-500/40 mb-3 group-hover:w-8 transition-all duration-300" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{feature.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
