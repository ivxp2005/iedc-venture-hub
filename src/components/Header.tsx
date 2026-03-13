import React from "react";
import { Menu, X, LogIn, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const [hidden, setHidden] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);
  const [logoKey, setLogoKey] = React.useState(0);
  const lastScrollY = React.useRef(0);
  const wasAtTop = React.useRef(true);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nowAtTop = y < 80;
      setAtTop(nowAtTop);
      // Re-trigger pop animation each time we return to top
      if (nowAtTop && !wasAtTop.current) {
        setLogoKey(k => k + 1);
      }
      wasAtTop.current = nowAtTop;
      if (y > lastScrollY.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Team', href: '#team' },
  ];

  return (
    <>
      {/* ── Big pop-in logo fixed top-left, desktop only ── */}
      <AnimatePresence>
        {atTop && (
          <motion.div
            key={logoKey}
            className="hidden md:block fixed top-4 left-10 z-[60] cursor-pointer pointer-events-auto"
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 15 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18, duration: 0.5 }}
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.07 }}
          >
            <img
              src={logoImg}
              alt="IEDC CEM Logo"
              className="h-48 w-auto object-contain drop-shadow-[0_0_24px_rgba(255,140,0,0.5)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 py-5 bg-transparent"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center">
          {/* Mobile: hamburger on left, theme toggle next to it */}
          <div className="md:hidden flex items-center justify-start gap-2">
            <button
              className="p-2"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-full border transition-all duration-300"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
                color: theme === 'dark' ? '#ffffff' : '#0a0a0a',
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Logo — hidden when at top (big logo covers it), shown when scrolled */}
          <motion.div
            className="hidden md:flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.03 }}
            animate={{ opacity: atTop ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={logoImg}
              alt="IEDC CEM Logo"
              className="h-10 w-auto object-contain"
            />
          </motion.div>

          {/* Desktop Nav — truly centered */}
          <nav className="hidden md:flex items-center justify-center space-x-2">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="relative px-5 py-2 text-base font-semibold text-white/80 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>

          {/* Mobile logo — smaller and pinned to right */}
          <motion.div
            className="md:hidden col-start-3 flex justify-end cursor-pointer"
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src={logoImg}
              alt="IEDC CEM Logo"
              className="h-16 w-auto object-contain drop-shadow-[0_0_18px_rgba(255,140,0,0.35)]"
            />
          </motion.div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center justify-end space-x-3">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ rotate: 20, scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="relative p-2 rounded-full border transition-all duration-300"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
                color: theme === 'dark' ? '#ffffff' : '#0a0a0a',
              }}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </motion.button>

            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 text-sm font-semibold border rounded-lg hover:border-orange-500 hover:text-orange-400 transition-all"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                  Dashboard
                </button>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-orange-500 rounded-lg hover:bg-orange-400 transition-all"
                >
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border rounded-lg hover:border-orange-500 hover:text-orange-400 transition-all"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                  <LogIn size={14} /> Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm font-black text-black bg-orange-500 rounded-lg hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20"
                >
                  Join IEDC
                </button>
              </>
            )}
          </div>

        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-white/10 mt-4"
            >
              <nav className="flex flex-col py-4 space-y-1">
                {navLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-white/70 hover:text-orange-400 hover:bg-white/5 rounded-lg transition-all font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-4 px-4">
                  {user ? (
                    <>
                      <button onClick={() => navigate('/dashboard')} className="py-2.5 text-sm font-semibold text-white border border-white/20 rounded-lg">Dashboard</button>
                      <button onClick={signOut} className="py-2.5 text-sm font-black text-black bg-orange-500 rounded-lg">Logout</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => navigate('/login')} className="py-2.5 text-sm font-semibold text-white border border-white/20 rounded-lg">Login</button>
                      <button onClick={() => navigate('/register')} className="py-2.5 text-sm font-black text-black bg-orange-500 rounded-lg">Join IEDC</button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
    </>
  );
};

export default Header;
