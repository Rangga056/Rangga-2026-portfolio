import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import SpotlightEffect from '@/components/SpotlightEffect';

export default function Home() {
  return (
    <>
      <SpotlightEffect />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
