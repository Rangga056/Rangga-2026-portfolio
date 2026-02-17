"use client";

import React, { useEffect, useRef } from 'react';
import { skillsData } from '@/data/skills';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
      const el = sectionRef.current;
      
      gsap.fromTo(el.querySelector('.skills-title'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: el, start: "top 80%" } }
      );

      gsap.fromTo(el.querySelectorAll('.skill-card'),
          { opacity: 0, y: 50 },
          { 
              opacity: 1, 
              y: 0, 
              duration: 0.6, 
              stagger: 0.1,
              scrollTrigger: {
                  trigger: el.querySelector('.skills-grid'),
                  start: "top 80%",
              }
          }
      );
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="skills-title text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3 opacity-0">
          <Cpu className="w-8 h-8 text-primary" />
          Technical Skills
        </h2>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skillGroup, index) => (
            <Card key={index} className="skill-card bg-card/50 hover:bg-card transition-all duration-300 opacity-0">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{skillGroup.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-secondary hover:border-primary/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
