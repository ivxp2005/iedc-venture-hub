import React, { useState } from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');

  const socialLinks = [
    { icon: Twitter,   href: "https://twitter.com/", label: "Twitter" },
    { icon: Linkedin,  href: "https://linkedin.com/company/", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
    { icon: Facebook,  href: "https://facebook.com/", label: "Facebook" },
  ];

  const quickLinks = [
    { title: "About IEDC",      href: "#about" },
    { title: "Events",          href: "#events" },
    { title: "Programs",        href: "#programs" },
    { title: "Success Stories", href: "#success" },
    { title: "Team",            href: "#team" },
    { title: "Contact",         href: "#contact" },
  ];

  const programs = [
    { title: "Startup Incubation",    href: "#" },
    { title: "Entrepreneur Bootcamp", href: "#" },
    { title: "Mentorship Program",    href: "#" },
    { title: "Tech Innovation Lab",   href: "#" },
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      {/* Top divider glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          {/* Brand column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-black font-black text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>I</span>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>IEDC</p>
                <p className="text-white/30 text-xs">Innovation Hub</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Empowering the next generation of entrepreneurs through innovation, mentorship, and startup support.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/40">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">College Of Engineering Muttathara, 695017</span>
              </div>
              <div className="flex items-center gap-3 text-white/40">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:iedccem@gmail.com" className="text-sm hover:text-orange-400 transition-colors">iedccem@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-white/40 hover:text-orange-500 transition-colors duration-200 text-sm"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-orange-500 transition-all duration-200 block" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Our Programs
            </h3>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href={program.href}
                    className="group flex items-center gap-2 text-white/40 hover:text-orange-500 transition-colors duration-200 text-sm"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-orange-500 transition-all duration-200 block" />
                    {program.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Stay Updated
              </h3>
              <p className="text-white/40 text-sm mb-4">
                Get the latest events and opportunities in your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEmail('')}
                  className="px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg text-sm transition-colors duration-200"
                >
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Follow Us
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-9 h-9 bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white/40 group-hover:text-orange-500 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © 2025 IEDC CEM. All rights reserved. Empowering innovation since 2018.
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
