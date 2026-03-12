import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, User, LogOut, Briefcase, Home, Calendar,
  TrendingUp, Star, ChevronRight, Rocket, Zap, Users,
  Settings, Award
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/Intergrations/supabase/client";
import { motion } from "framer-motion";
import logoImg from "@/assets/images/logo.png";

interface Profile {
  id: string;
  full_name: string | null;
  designation: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (!error) setProfile(data);
      }
    };
    fetchProfile();
  }, [user]);

  const notifications = [
    { id: 1, title: "New Event: Tech Startup Workshop", message: "Join us for an exciting workshop on building tech startups", time: "2 hours ago", unread: true },
    { id: 2, title: "Program Application Approved", message: "Your application for the Entrepreneurship Program has been approved", time: "1 day ago", unread: true },
    { id: 3, title: "Weekly Newsletter", message: "Check out this week's innovation highlights and success stories", time: "3 days ago", unread: false },
  ];

  const stats = [
    { icon: Rocket, label: "Events Joined", value: "4", color: "text-orange-400" },
    { icon: Star, label: "Points Earned", value: "320", color: "text-yellow-400" },
    { icon: Users, label: "Connections", value: "28", color: "text-blue-400" },
    { icon: Award, label: "Achievements", value: "6", color: "text-green-400" },
  ];

  const quickActions = [
    { icon: Calendar, label: "Browse Events", desc: "View upcoming hackathons & workshops", action: () => navigate("/#events") },
    { icon: Briefcase, label: "Join Programs", desc: "Apply for incubation programs", action: () => navigate("/#programs") },
    { icon: TrendingUp, label: "Success Stories", desc: "Read inspiring founder stories", action: () => navigate("/#success") },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-orange-500/30 border-t-orange-500 rounded-full"
        />
      </div>
    );
  }

  if (!user) return null;

  const displayName = profile?.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-orange-500/6 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full bg-orange-600/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex min-h-screen">

        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-white/8 bg-black/30 backdrop-blur-sm px-4 py-6 gap-1 shrink-0">
          {/* Logo */}
          <div
            className="flex items-center gap-3 mb-8 px-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logoImg} alt="IEDC" className="h-10 w-auto object-contain" />
          </div>

          {/* Nav items */}
          {[
            { icon: Home, label: "Overview", id: "overview" },
            { icon: Bell, label: "Notifications", id: "notifications" },
            { icon: User, label: "Profile", id: "profile" },
            { icon: Settings, label: "Settings", id: "settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.id === "notifications" && notifications.filter(n => n.unread).length > 0 && (
                <span className="ml-auto bg-orange-500 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            </button>
          ))}

          <div className="mt-auto border-t border-white/8 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/8 transition-all w-full"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Top bar */}
          <header className="border-b border-white/8 bg-black/20 backdrop-blur-sm px-6 py-4 flex items-center justify-between shrink-0">
            <div>
              <p className="text-white/40 text-xs font-mono uppercase tracking-wider">Member Portal</p>
              <h1 className="text-lg font-bold">Welcome back, <span className="text-orange-400">{displayName.split(" ")[0]}</span></h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile: logo */}
              <img
                src={logoImg}
                alt="IEDC"
                className="h-8 w-auto object-contain lg:hidden cursor-pointer"
                onClick={() => navigate("/")}
              />
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-black font-bold text-sm shrink-0">
                {initials}
              </div>
            </div>
          </header>

          {/* Page body */}
          <main className="flex-1 overflow-y-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto space-y-8"
            >

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    whileHover={{ y: -3, borderColor: "rgba(255,106,0,0.4)" }}
                    className="relative p-5 rounded-xl bg-white/[0.03] border border-white/8 overflow-hidden group transition-all"
                  >
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-orange-500/0 group-hover:border-orange-500/40 transition-colors rounded-bl-xl" />
                    <stat.icon className={`w-5 h-5 mb-3 ${stat.color}`} />
                    <p className="text-2xl font-black text-white tabular-nums">{stat.value}</p>
                    <p className="text-white/40 text-xs uppercase tracking-wider mt-0.5 font-mono">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-5 gap-6">

                {/* Notifications */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-white/60 font-mono">Notifications</h2>
                    <span className="text-xs text-orange-400 font-mono">{notifications.filter(n => n.unread).length} unread</span>
                  </div>
                  {notifications.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${
                        n.unread
                          ? "bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40"
                          : "bg-white/[0.02] border-white/8 hover:border-white/15"
                      }`}
                    >
                      {n.unread && (
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-orange-500" />
                      )}
                      <h4 className="font-semibold text-sm text-white mb-1 pr-6">{n.title}</h4>
                      <p className="text-white/45 text-xs leading-relaxed mb-2">{n.message}</p>
                      <p className="text-white/25 text-xs font-mono">{n.time}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Profile card */}
                <div className="lg:col-span-2">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-white/60 font-mono mb-4">Profile</h2>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/8">
                    <div className="flex flex-col items-center text-center mb-5">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-black font-black text-2xl mb-3 shadow-lg shadow-orange-500/30">
                        {initials}
                      </div>
                      <h3 className="font-bold text-white">{profile?.full_name || displayName}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Briefcase className="w-3 h-3 text-orange-500/70" />
                        <p className="text-orange-400/70 text-xs">{profile?.designation || "IEDC Member"}</p>
                      </div>
                      <p className="text-white/30 text-xs mt-1">{user.email}</p>
                    </div>
                    <div className="h-px bg-white/8 mb-4" />
                    <button className="w-full py-2.5 px-4 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-semibold hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all duration-200">
                      Edit Profile
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="w-full mt-2 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Home className="w-3.5 h-3.5" />
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/60 font-mono mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {quickActions.map((action, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                      whileHover={{ y: -4 }}
                      onClick={action.action}
                      className="group p-5 rounded-xl bg-white/[0.03] border border-white/8 hover:border-orange-500/40 transition-all text-left relative overflow-hidden"
                    >
                      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-orange-500/0 group-hover:bg-orange-500/10 blur-xl transition-all duration-500" />
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
                        <action.icon className="w-5 h-5 text-orange-400" />
                      </div>
                      <h3 className="font-bold text-white text-sm mb-1">{action.label}</h3>
                      <p className="text-white/40 text-xs leading-relaxed">{action.desc}</p>
                      <ChevronRight className="absolute bottom-4 right-4 w-4 h-4 text-white/20 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </div>

            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
