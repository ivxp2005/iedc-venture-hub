import React, { useRef } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Linkedin } from "lucide-react";
import rahulvk from '../assets/images/rahul.jpg';
import ishma from '../assets/images/ishma.jpg';
import pardhiv from '../assets/images/pardhiv.jpg';
import dany from '../assets/images/dany.jpg';
import aman from '../assets/images/AMAN.jpg';
import suhail from '../assets/images/suhail.jpg';
import akshara from '../assets/images/akshara.jpg';
import niveditha from '../assets/images/niveditha.jpg';
import gaori from '../assets/images/gaori.jpg';
import abhin from '../assets/images/abhin.jpg';
import akhil from '../assets/images/akhil.jpg';

const Team = () => {
    const autoplayPlugin = useRef(
        Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    const teamMembers = [
        { id: 1,  name: "Rahul V K",           position: "Student Lead",                  image: rahulvk,   linkedin: "https://www.linkedin.com/in/rahul-v-k/",           pos: "center 50%" },
        { id: 2,  name: "Ishma T P",           position: "Student Lead",                  image: ishma,     linkedin: "https://www.linkedin.com/in/ishma-tp-229770373/" },
        { id: 3,  name: "Pardhiv Suresh M",    position: "Technical Lead",                image: pardhiv,   linkedin: "https://www.linkedin.com/in/pardhiv-suresh-m/" },
        { id: 4,  name: "Dany Stephen V P",    position: "Quality & Operation Lead",      image: dany,      linkedin: "https://www.linkedin.com/in/dany-stephen",             pos: "70% 90%" },
        { id: 5,  name: "Aman Xavier",         position: "Finance Lead",                  image: aman,      linkedin: "https://www.linkedin.com/in/aman-xavier",              pos: "center 70%" },
        { id: 6,  name: "Mohamed Suhail D",    position: "Quality & Operation Lead",      image: suhail,    linkedin: "https://www.linkedin.com/in/mohamed-suhail-d" },
        { id: 7,  name: "Akshara A S",         position: "Branding & Marketing Lead",     image: akshara,   linkedin: "https://www.linkedin.com/in/akshara-a-s-" },
        { id: 8,  name: "Niveditha A S",       position: "Community Lead",                image: niveditha, linkedin: "https://www.linkedin.com/in/niveditha-a-s-" },
        { id: 9,  name: "Gaori Nandhana D S",  position: "Women Entrepreneurship Lead",   image: gaori,     linkedin: "https://www.linkedin.com/in/gaori-nandana-d-s-477960374", pos: "center 60%" },
        { id: 10, name: "Abhin M Raj",         position: "IPR Research Lead",             image: abhin,     linkedin: "https://www.linkedin.com/in/abhinmraj",            pos: "40% 30%" },
        { id: 11, name: "Akhil M S",           position: "Branding & Marketing Lead",     image: akhil,     linkedin: "https://www.linkedin.com/in/akhil-ams/",              pos: "center 50%" },             
    ];

    return (
        <section id="team" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-orange-500/8 blur-[120px] pointer-events-none" />

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
                        Our Team
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-5">
                        Meet the <span className="text-orange-500">Minds</span> Behind IEDC
                    </h2>
                    <p className="text-lg text-white/60 max-w-3xl mx-auto">
                        Our dedicated team of innovators, entrepreneurs, and leaders working together to build a thriving startup ecosystem.
                    </p>
                </motion.div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full max-w-6xl mx-auto mb-16"
                >
                    <Carousel className="w-full" plugins={[autoplayPlugin.current]} opts={{ loop: true, align: "start" }}>
                        <CarouselContent>
                            {teamMembers.map((member) => (
                                <CarouselItem key={member.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <div className="p-2">
                                        <div className="relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300">
                                            {/* Image */}
                                            <div className="aspect-[3/4] overflow-hidden">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    style={{ objectPosition: member.pos ?? 'top' }}
                                                />
                                            </div>

                                            {/* Dark overlay on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Hovering social links */}
                                            <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                                                <div className="flex gap-2">
                                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all">
                                                        <Linkedin size={13} />
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Static info bar */}
                                            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/95 to-transparent group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                                                <h3 className="font-bold text-white text-base mb-0.5">{member.name}</h3>
                                                <p className="text-orange-400 text-xs font-medium">{member.position}</p>
                                            </div>

                                            {/* Orange corner glow */}
                                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-12 bg-zinc-900 border-white/20 text-white hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all" />
                        <CarouselNext className="hidden md:flex -right-12 bg-zinc-900 border-white/20 text-white hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all" />
                    </Carousel>
                </motion.div>

            </div>
        </section>
    );
};

export default Team;
