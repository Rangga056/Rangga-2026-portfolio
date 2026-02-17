"use client";

import React, { useEffect, useRef, useState } from 'react';
import { projectsData } from '@/data/projects';
import { Card, CardContent } from '@/components/ui/Card';
import { FolderOpen, ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }) {
  return (
    <Card className="project-card bg-card/50 hover:bg-card transition-all duration-300 group opacity-0">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors pr-4">
              {project.title}
            </h3>
            <div className="flex gap-2 shrink-0">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Live Demo">
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.map((t, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border border-secondary">
                {t}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const otherCardsRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const featured = projectsData.filter(p => p.featured);
  const others   = projectsData.filter(p => !p.featured);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(el.querySelector('.projects-title'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: el, start: 'top 80%' } }
    );

    gsap.fromTo(el.querySelectorAll('.featured-grid .project-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: el.querySelector('.featured-grid'), start: 'top 80%' }
      }
    );
  }, []);

  useEffect(() => {
    if (showAll && otherCardsRef.current) {
      gsap.fromTo(
        otherCardsRef.current.querySelectorAll('.project-card'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }
      );
    }
  }, [showAll]);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="projects-title text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3 opacity-0">
          <FolderOpen className="w-8 h-8 text-primary" />
          Featured Projects
        </h2>

        {/* Featured */}
        <div className="featured-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featured.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>

        {/* Toggle */}
        {others.length > 0 && (
          <>
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAll(prev => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-secondary bg-card text-secondary-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                {showAll ? (
                  <><ChevronUp className="w-4 h-4" /> Hide Other Projects</>
                ) : (
                  <><ChevronDown className="w-4 h-4" /> Show All Projects ({projectsData.length})</>
                )}
              </button>
            </div>

            {showAll && (
              <div ref={otherCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {others.map(p => <ProjectCard key={p.id} project={p} />)}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
