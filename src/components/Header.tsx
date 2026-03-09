import React from "react";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Team', href: '#team' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-lg">I</span>
              </div>
            </div>
            <div>
              <h1 className="text-white font-black text-xl tracking-tight">IEDC</h1>
              <p className="text-orange-400 text-xs font-medium tracking-widest uppercase">Innovation Hub</p>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 text-sm font-semibold text-white border border-white/20 rounded-lg hover:border-orange-500 hover:text-orange-400 transition-all"
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
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white border border-white/20 rounded-lg hover:border-orange-500 hover:text-orange-400 transition-all"
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

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
  );
};

export default Header;
