
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import ScrollReveal from './components/ScrollReveal';
import Loader from './components/Loader';
import SnakeGame from './components/SnakeGame';
import SmoothScroll from './components/SmoothScroll';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div 
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        overflow: 'hidden',
      }}
    >
      {/* Background Neon Grid Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.007) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.007) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating Animated Particles */}
      <ParticleBackground />

      {/* Custom Trailing Cursor */}
      <CustomCursor />

      {/* Buttury Smooth Scroll Engine */}
      <SmoothScroll />

      {/* Floating Ambient Highlights */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--accent-cyan-rgb), 0.05) 0%, transparent 60%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '70%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--accent-purple-rgb), 0.05) 0%, transparent 60%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Core Interface Assembly */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />

        <ScrollReveal id="about" animationType="zoom-in-up">
          <About />
        </ScrollReveal>
        <ScrollReveal id="skills" animationType="zoom-in">
          <Skills />
        </ScrollReveal>
        <ScrollReveal id="projects" animationType="zoom-in-up">
          <Projects />
        </ScrollReveal>
        <ScrollReveal id="arcade" animationType="zoom-out">
          <SnakeGame />
        </ScrollReveal>
        <ScrollReveal id="experience" animationType="zoom-in-up">
          <Experience />
        </ScrollReveal>
        <ScrollReveal id="contact" animationType="zoom-in">
          <Contact />
        </ScrollReveal>
        <Footer />
      </div>
    </div>
    </>
  );
}
