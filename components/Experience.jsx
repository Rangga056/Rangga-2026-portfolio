"use client";

import React, { useEffect, useRef } from 'react';
import { experienceData } from '@/data/experience';
import { Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(el.querySelector('.exp-title'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: el, start: "top 80%" } }
    );

    const items = el.querySelectorAll('.exp-item');
    items.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.8, 
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                }
            }
        );
    });

  }, []);

  const sortedExperience = [...experienceData].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <h2 className="exp-title text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3 opacity-0">
          <Briefcase className="w-8 h-8 text-primary" />
          Work Experience
        </h2>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary before:to-transparent">
          {sortedExperience.map((exp, index) => (
            <div key={exp.id} className="exp-item relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active opacity-0">
              
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                 <Briefcase className="w-5 h-5 text-primary" />
              </div>
              
              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-secondary p-6 rounded-xl shadow-sm hover:border-primary/50 transition-colors duration-300">
                <div className="flex flex-col sm:flex-row justify-between mb-1">
                  <h3 className="font-bold text-lg text-foreground">{exp.role}</h3>
                  <time className="font-mono text-xs text-primary">{exp.period}</time>
                </div>
                <div className="text-sm font-medium text-muted-foreground mb-4">{exp.company} | {exp.location}</div>
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                     <li key={i} className="text-sm text-muted-foreground/90 pl-4 relative before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/50">
                        {item}
                     </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
