
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Team from "@/components/Team";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />

      <Team />
      <Footer />
    </div>
  );
};

export default Index;