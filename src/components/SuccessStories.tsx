import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessStories = () => {
  const navigate = useNavigate();

  const stories = [
    {
      name: "Codequest 25",
      org: "IEDC & CODIAC",
      industry: "Tech",
      description: "10-hour Hackathon conducted in association between CODIAC & IEDC. People from various fields participated.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80",
      tag: "Hackathon",
      meta: ["30+ Participants", "10 Hrs"],
    },
    {
      name: "Women Entrepreneurial Session",
      org: "IEDC",
      industry: "Leadership",
      description: "A powerful talk session by a women entrepreneur speaking about the challenges faced in the field.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      tag: "Talk Session",
      meta: ["20+ Attendees", "Inspiring"],
    },
    {
      name: "Inauguration",
      org: "IEDC",
      industry: "Milestone",
      description: "Official inauguration of the new executive IEDC committee — a new chapter begins.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      tag: "Ceremony",
      meta: ["30+ Guests", "Official"],
    },
  ];

  return (
    <section id="success" className="py-28 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-orange-500/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Our <span className="text-orange-500">Stories</span>
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            A look at the inspiring events and milestones that define the IEDC journey.
          </p>
        </motion.div>

        {/* Story Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-black">
                    {story.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/60 text-xs">{story.industry}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                  {story.name}
                </h3>
                <p className="text-orange-500/80 text-sm font-medium mb-3">{story.org}</p>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{story.description}</p>

                {/* Meta tags */}
                <div className="flex flex-wrap gap-2">
                  {story.meta.map((m, mi) => (
                    <span key={mi} className="px-3 py-1 rounded-full text-xs border border-white/10 text-white/40 bg-white/5">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-10 lg:p-14 text-center"
        >
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none" />
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 relative z-10">
            Ready to Write Your <span className="text-orange-500">Success Story?</span>
          </h3>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Join the community of entrepreneurs who started their journey with IEDC. Your idea could be the next big thing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-black font-bold rounded-xl text-lg hover:bg-orange-400 transition-colors glow-orange"
            >
              Apply to Incubator
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl text-lg hover:border-orange-500 hover:text-orange-400 transition-all"
            >
              Meet the Team
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;

