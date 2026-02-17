"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import AnimatedGrid from "./AnimatedGrid";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <AnimatedGrid />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-background to-background" style={{ zIndex: 1 }} />
      
      <div className="relative z-10">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 animate-gradient">
            Hey there! I'm{" "}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-primary animate-gradient-shift">
            Rangga
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white/80 via-white to-white animate-gradient">
            .
          </span>
        </h1>
        
        <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
          Software Engineer & Fullstack Developer crafting modern digital experiences.
        </p>
        
        <div ref={ctaRef}>
          <a 
            href="#about"
            className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
          >
            Explore my work 
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
