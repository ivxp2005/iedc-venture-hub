import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: ''
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: "We've received your message and will get back to you soon.",
    });
    setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
  };

  const contactInfo = [
    { icon: MapPin, title: "Visit Us",      details: "College Of Engineering Muttathara\n695017" },
    { icon: Phone,  title: "Call Us",       details: "" },
    { icon: Mail,   title: "Email Us",      details: "support@iedc.edu.in" },
    { icon: Clock,  title: "Office Hours",  details: "Mon â€“ Fri: 9 AM â€“ 6 PM\nSat: 10 AM â€“ 4 PM" },
  ];

  const quickActions = [
    { title: "Join IEDC Community",   description: "Become part of our entrepreneurial ecosystem", action: "Join Now",      icon: MessageCircle },
    { title: "Schedule Mentorship",   description: "Book a session with our expert mentors",         action: "Book Session",  icon: Phone },
    { title: "Submit Your Idea",      description: "Share your startup idea for evaluation",          action: "Submit Idea",   icon: Send },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200";

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-orange-500 uppercase mb-4 border border-orange-500/30 px-4 py-1.5 rounded-full">
            Contact Us
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's Build<br /><span className="text-orange-500">Together</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Ready to start your entrepreneurial journey? We're here every step of the way.
          </p>
        </motion.div>

        {/* Form + Info grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Form â€” 2 columns */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Send us a Message
              </h3>
              <p className="text-white/40 mb-8 text-sm">Fill out the form and we'll get back to you.</p>

              <form onSubmit={handleSendMessage} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">First Name</label>
                    <input type="text" className={inputClass} placeholder="John"
                      value={formData.firstName} onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">Last Name</label>
                    <input type="text" className={inputClass} placeholder="Doe"
                      value={formData.lastName} onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))} required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">Email</label>
                  <input type="email" className={inputClass} placeholder="john@example.com"
                    value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">Subject</label>
                  <select className={inputClass} value={formData.subject}
                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}>
                    <option className="bg-zinc-900">General Inquiry</option>
                    <option className="bg-zinc-900">Startup Consultation</option>
                    <option className="bg-zinc-900">Event Registration</option>
                    <option className="bg-zinc-900">Partnership Opportunity</option>
                    <option className="bg-zinc-900">Mentorship Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">Message</label>
                  <textarea rows={5} className={inputClass} placeholder="Tell us about your idea or what you'd like to discuss..."
                    value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} required />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 px-8 rounded-lg text-base transition-colors duration-200"
                >
                  <Send size={18} />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact info cards â€” 1 column */}
          <motion.div className="space-y-4" variants={itemVariants}>
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start gap-4 bg-white/5 border border-white/10 hover:border-orange-500/30 rounded-xl p-5 transition-all duration-300">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <info.icon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1">{info.title}</h4>
                  <p className="text-white/40 text-sm whitespace-pre-line leading-relaxed">{info.details}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick action cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              onClick={() => {
                if (action.action === 'Join Now' || action.action === 'Submit Idea') navigate('/register');
                else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative overflow-hidden text-left bg-white/5 border border-white/10 hover:border-orange-500/40 rounded-2xl p-6 group transition-all duration-300 w-full"
            >
              {/* Top orange bar */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <action.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {action.title}
              </h3>
              <p className="text-white/40 text-sm mb-4">{action.description}</p>
              <span className="flex items-center gap-2 text-sm font-semibold text-orange-500 group-hover:gap-3 transition-all duration-200">
                {action.action} <ArrowRight size={14} />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
