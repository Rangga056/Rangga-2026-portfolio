"use client";

import React, { useEffect, useRef } from 'react';
import { personalData } from '@/data/personal';
import { Mail, Phone, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function SocialLink({ href, icon, label }) {
    if (!href) return null;
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            aria-label={label}
        >
            {icon}
        </a>
    );
}

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(el.querySelector('.contact-title'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: el, start: "top 80%" } }
    );

    gsap.fromTo(el.querySelectorAll('.contact-item'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: el, start: "top 75%" } }
    );
  }, []);

  const { contact } = personalData;

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="contact-title text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-3 opacity-0">
          <Mail className="w-8 h-8 text-primary" />
          Get In Touch
        </h2>

        <div className="space-y-4 mb-10">
          <a 
            href={`mailto:${contact.email}`}
            className="contact-item block text-muted-foreground hover:text-primary transition-colors text-lg opacity-0"
          >
            {contact.email}
          </a>
          <a 
            href={`tel:${contact.phone}`}
            className="contact-item block text-muted-foreground hover:text-primary transition-colors text-lg opacity-0"
          >
            {contact.phone}
          </a>
        </div>

        <div className="contact-item flex justify-center gap-4 opacity-0">
          <SocialLink href={contact.github} icon={<Github className="w-5 h-5" />} label="GitHub" />
          <SocialLink href={contact.linkedin} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
          <SocialLink href={contact.instagram} icon={<Instagram className="w-5 h-5" />} label="Instagram" />
          <SocialLink href={contact.whatsapp} icon={<MessageCircle className="w-5 h-5" />} label="WhatsApp" />
        </div>

        <p className="mt-16 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Muhammad Rangga Miftahul Falah. All rights reserved.
        </p>
      </div>
    </section>
  );
}
