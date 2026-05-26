
import { User, Shield, Zap, Coffee } from 'lucide-react';
import TextReveal from './TextReveal';

const stats = [
  { id: 1, icon: <Zap size={22} style={{ color: 'var(--accent-purple)' }} />, value: '3+', label: 'Years Experience' },
  { id: 2, icon: <Shield size={22} style={{ color: 'var(--accent-cyan)' }} />, value: '0+', label: 'Projects Built' },
  { id: 3, icon: <Coffee size={22} style={{ color: 'var(--accent-pink)' }} />, value: '999+', label: 'Cups of Coffee' },
];

const interests = [
  'TypeScript', 'React.js', 'Embedded C', 'Open CV', 
  'Matplotlib', 'Node.js', 'Circuit Design', 'Machine Leaning'
];

export default function About() {
  return (
    <section id="about" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'start', marginTop: '1.5rem' }}>
          
          {/* Left Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User size={26} style={{ color: 'var(--accent-purple)' }} />
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Who I Am</h3>
            </div>
            
            <TextReveal
              tag="p"
              lines={[
                "I'm a B.Tech student in VLSI Design with a deep interest in how chips think",
                "and how intelligent hardware is shaping the future. My work lies at the intersection",
                "of VLSI design, embedded systems, and machine learning because I believe the next",
                "generation of technology needs engineers who understand both hardware and AI. My toolkit",
                "includes embedded C, Python, and EDA tools, working from transistor-level concepts to AI.",
                "I'm actively exploring opportunities in chip verification and intelligent hardware."
              ]}
              staggerDelay={0.12}
              style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}
            />

            <TextReveal
              tag="p"
              lines={[
                "Beyond technology, anime has played a major role in motivating me throughout my journey,",
                "especially Itachi Uchiha from Naruto. His discipline, calm mindset, intelligence,",
                "and ability to carry responsibilities silently inspire me to stay focused during challenges.",
                "The way he balanced sacrifice, strategy, and self-control motivates me to keep learning,",
                "work harder, and stay dedicated to my goals no matter how difficult the path becomes."
              ]}
              staggerDelay={0.12}
              baseDelay={0.2}
              style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}
            />

            {/* Interests Cloud */}
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Technical Focus & Passions</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="glass"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      padding: '0.5rem 1rem',
                      borderRadius: '100px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-secondary)',
                      transition: 'var(--transition-fast)',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.color = 'var(--accent-cyan)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Stats Column */}
          <div className="about-stats-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            
            {/* AI Avatar Card Display */}
            <div 
              className="glass" 
              style={{
                padding: '1.75rem',
                border: '1px solid var(--border-glow-purple)',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(13, 17, 39, 0.7) 100%)',
              }}
            >
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '2px solid var(--accent-purple)',
                }}
              >
                <img src="./avatar.png" alt="Rishik" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Rishik Kumar Singh</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: 600, marginTop: '0.1rem' }}>VLSI DESIGNER & ELETRIONICS ENGINEER</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: '1.4' }}>
                  "Time doesn't heal anything , it teach us how to live with pain.So try this pain never effort in your journey" — inspired by Itachi, coded for reality.
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="glass"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div 
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, display: 'block', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
