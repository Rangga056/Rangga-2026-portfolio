"use client";

import React, { useEffect, useRef } from 'react';
import { achievementsData } from '@/data/achievements';
import { Card, CardContent } from '@/components/ui/Card';
import { Trophy, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(el.querySelector('.ach-title'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: el, start: "top 80%" } }
    );

    gsap.fromTo(el.querySelectorAll('.ach-card'),
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, 
        duration: 0.6, 
        stagger: 0.15,
        scrollTrigger: { trigger: el.querySelector('.ach-grid'), start: "top 85%" }
      }
    );
  }, []);

  const sorted = [...achievementsData].sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort));

  return (
    <section id="achievements" ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="ach-title text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3 opacity-0">
          <Trophy className="w-8 h-8 text-primary" />
          Achievements & Certifications
        </h2>
        <div className="ach-grid space-y-4">
          {sorted.map((ach) => (
            <Card key={ach.id} className="ach-card bg-card/50 hover:bg-card transition-all duration-300 opacity-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground">{ach.title}</h3>
                    <p className="text-sm text-primary font-medium">{ach.organization} — {ach.date}</p>
                    <p className="text-sm text-muted-foreground mt-2">{ach.description}</p>
                  </div>
                  {ach.link && (
                    <a 
                      href={ach.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      View <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
