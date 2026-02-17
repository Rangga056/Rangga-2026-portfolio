"use client";

import React, { useEffect, useRef } from 'react';
import { personalData } from '@/data/personal';
import { Card, CardContent } from '@/components/ui/Card';
import { User } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(el.querySelector('.about-title'), 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(el.querySelector('.profile-image'),
      { opacity: 0, scale: 0.8, rotate: -10 },
      { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        duration: 1, 
        delay: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );

    gsap.fromTo(el.querySelector('.about-card'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: 0.4,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="about-title text-3xl md:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3 opacity-0">
          <User className="w-8 h-8 text-primary" />
          About Me
        </h2>

        {/* Profile Image */}
        <div className="profile-image flex justify-center mb-8 opacity-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-shift"></div>
            <div className="relative">
              <Image
                src={personalData.avatar}
                alt="Rangga Profile Photo"
                width={180}
                height={180}
                className="rounded-full border-4 border-background object-cover w-[180px] h-[180px]"
                priority
              />
            </div>
          </div>
        </div>
        
        <Card className="about-card bg-card/50 backdrop-blur-sm border-secondary opacity-0">
          <CardContent className="p-8">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {personalData.summary}
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Education</h3>
                {personalData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-medium text-primary">{edu.degree}</h4>
                    <p className="text-sm text-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu.period}</p>
                    <p className="text-sm mt-1 text-muted-foreground">{edu.description}</p>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Current Interest</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Next.js 15 & React Server Components</li>
                  <li>AI Agents & Automation</li>
                  <li>System Optimization</li>
                  <li>Modern Web Architecture</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
