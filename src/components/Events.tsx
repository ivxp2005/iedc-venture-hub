import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import EventCarousel from "./EventCarousel.tsx";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "Startup Pitch Competition",
      date: "Dec 15, 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
      participants: "50+ Teams",
      description: "Present your innovative ideas to industry experts and win exciting prizes.",
      type: "Competition",
      isPast: true,
    },
    {
      id: 2,
      title: "AI & Machine Learning Workshop",
      date: "Dec 20, 2024",
      time: "2:00 PM",
      location: "Tech Lab",
      participants: "100+ Students",
      description: "Hands-on workshop covering latest AI trends and practical implementations.",
      type: "Workshop",
      isPast: true,
    },
    {
      id: 3,
      title: "Entrepreneur Networking Fest",
      date: "Dec 25, 2024",
      time: "6:00 PM",
      location: "Innovation Hub",
      participants: "200+ Professionals",
      description: "Connect with successful entrepreneurs and expand your professional network.",
      type: "Networking",
      isPast: true,
    },
  ];

  const typeColors: Record<string, string> = {
    Competition: "border-orange-500/50 text-orange-400 bg-orange-500/10",
    Workshop: "border-white/20 text-white/70 bg-white/5",
    Networking: "border-white/20 text-white/70 bg-white/5",
  };

  return (
    <section id="events" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-orange-500/8 blur-[100px] pointer-events-none" />

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
            Events
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Upcoming <span className="text-orange-500">Events</span>
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Join our exciting events designed to foster innovation, learning, and networking opportunities for aspiring entrepreneurs.
          </p>
        </motion.div>

        {/* Past Events Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center mb-3">
            Past Events <span className="text-orange-500">Gallery</span>
          </h3>
          <p className="text-center text-white/50 mb-10 text-sm">A glimpse of our community in action</p>
          <EventCarousel />
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
            >
              {/* Top orange line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-5">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${typeColors[event.type]}`}>
                  {event.type}
                </span>
                <Calendar className="w-4 h-4 text-white/30" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                {event.title}
              </h3>
              <p className="text-white/50 text-sm mb-5 leading-relaxed">{event.description}</p>

              <div className="space-y-2 mb-6">
                {[
                  { Icon: Calendar, text: event.date },
                  { Icon: Clock, text: event.time },
                  { Icon: MapPin, text: event.location },
                  { Icon: Users, text: event.participants },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/50 text-sm">
                    <Icon className="w-3.5 h-3.5 text-orange-500/70 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {event.isPast ? (
                <div className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/30 text-sm font-medium cursor-not-allowed select-none">
                  <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
                  Event Over
                </div>
              ) : (
                <button
                  onClick={() => navigate("/register")}
                  className="group/btn w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-semibold hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all duration-300"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Events;

