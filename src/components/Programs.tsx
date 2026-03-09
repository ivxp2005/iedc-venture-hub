import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, BookOpen, Handshake, Code, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Programs = () => {
  const navigate = useNavigate();

  const programs = [
    {
      icon: Rocket,
      title: "Startup Incubation",
      duration: "6–12 months",
      description: "Comprehensive support for early-stage startups including mentorship, workspace, and funding opportunities.",
      features: ["Dedicated workspace", "1:1 mentorship", "Funding connections", "Legal support"],
    },
    {
      icon: BookOpen,
      title: "Entrepreneur Bootcamp",
      duration: "3 months",
      description: "Intensive program covering all aspects of entrepreneurship from ideation to business model validation.",
      features: ["Weekly workshops", "Industry experts", "Peer networking", "Demo day"],
    },
    {
      icon: Handshake,
      title: "Mentorship Program",
      duration: "Ongoing",
      description: "Connect with successful entrepreneurs and industry leaders for personalized guidance and support.",
      features: ["Expert mentors", "Monthly sessions", "Industry insights", "Network access"],
    },
    {
      icon: Code,
      title: "Tech Innovation Lab",
      duration: "4 months",
      description: "Focus on technology-driven solutions with access to cutting-edge tools and resources.",
      features: ["Latest tech stack", "Research support", "Patent guidance", "Tech partnerships"],
    }
  ];

  const benefits = [
    { stat: "50+", title: "Expert Mentors", desc: "Learn from successful entrepreneurs" },
    { stat: "₹10k+", title: "Funded", desc: "Access to investors and funding" },
    { stat: "100+", title: "Partners", desc: "Connect with leading companies" },
    { stat: "85%", title: "Success Rate", desc: "High success rate from our programs" },
  ];

  return (
    <section id="programs" className="py-28 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-orange-500/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-6">
            Programs
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Our <span className="text-orange-500">Programs</span>
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Comprehensive programs designed to support entrepreneurs at every stage of their journey.
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Orange top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <program.icon className="w-7 h-7 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-1">{program.title}</h3>
                  <span className="text-xs text-orange-500/70 font-medium px-2 py-0.5 rounded-full border border-orange-500/20 bg-orange-500/5">
                    {program.duration}
                  </span>
                </div>
              </div>

              <p className="text-white/60 mb-6 leading-relaxed">{program.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {program.features.map((feature, fi) => (
                  <div key={fi} className="flex items-center gap-2 text-sm text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/register')}
                className="group/btn flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Why IEDC Programs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-white/5 border border-white/10 p-10 lg:p-14"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose <span className="text-orange-500">IEDC</span> Programs?</h3>
            <p className="text-white/60 max-w-xl mx-auto">
              Proven methodologies backed by years of experience in nurturing successful entrepreneurs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all"
              >
                <h4 className="text-3xl font-bold text-orange-400 mb-2">{b.stat}</h4>
                <h5 className="font-semibold text-white mb-1 text-sm">{b.title}</h5>
                <p className="text-white/40 text-xs">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-black font-bold rounded-xl text-lg hover:bg-orange-400 transition-colors glow-orange"
            >
              Apply to Our Programs
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;
