import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

interface TimelineItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    role: 'Kendriya Vidyalaya',
    company: 'Web Development & Finance Enthusiast',
    duration: '2006 - 2023',
    description: 'Passionate about web development, full-stack technologies, and finance, with a strong interest in building modern digital solutions and continuously learning new skills across tech and business domains.',
    icon: <Briefcase size={18} />,
    color: 'var(--accent-purple)',
  },
  {
    role: 'KIIT Polytechnic',
    company: 'Electronics & Telecommunication Engineering',
    duration: '2023 - 2026',
    description: 'Passionate about Electronics and Telecommunication with a strong interest in DSP and Control Systems, focused on signal processing, system analysis, and intelligent electronic technologies.',
    icon: <Briefcase size={18} />,
    color: 'var(--accent-cyan)',
  },
  {
    role: 'KIIT University',
    company: 'VLSI Design & Electronics Engineering',
    duration: '2026 - PRESENT',
    description: 'Driven by a passion for semiconductor technology, digital systems, DSP, and Control Systems, with a focus on designing efficient and intelligent electronic hardware.',
    icon: <GraduationCap size={18} />,
    color: 'var(--accent-pink)',
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">My Experience</h2>

        <div 
          style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '2rem auto 0 auto',
            padding: '2rem 0',
          }}
        >
          {/* Central Vertical Glowing Line */}
          <div 
            style={{
              position: 'absolute',
              left: '30px',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent-purple), var(--accent-cyan), var(--accent-pink))',
              opacity: 0.4,
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)',
            }}
            className="timeline-line"
          />

          {/* Timeline Items Deck */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {timelineData.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  gap: '2.5rem', 
                  alignItems: 'start',
                  position: 'relative',
                }}
                className="timeline-item"
              >
                
                {/* Pulsing Outer Neon Circle checkpoint */}
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-secondary)',
                    border: `2px solid ${item.color}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: `0 0 15px ${item.color}35`,
                    zIndex: 2,
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                  }}
                  className="timeline-node"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 25px ${item.color}`;
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 15px ${item.color}35`;
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={{ color: item.color }}>
                    {item.icon}
                  </div>
                </div>

                {/* Glass Card Details */}
                <div 
                  className="glass" 
                  style={{ 
                    padding: '1.75rem', 
                    border: '1px solid var(--border-color)',
                    width: '100%',
                    transition: 'var(--transition-smooth)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {/* Header Row */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.role}
                      </h3>
                      <span style={{ fontSize: '0.9rem', color: item.color, fontWeight: 700 }}>
                        {item.company}
                      </span>
                    </div>

                    <div 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.4rem', 
                        color: 'var(--text-muted)', 
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.04)',
                        fontFamily: 'monospace'
                      }}
                    >
                      <Calendar size={14} />
                      {item.duration}
                    </div>
                  </div>

                  {/* Body description */}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    {item.description}
                  </p>

                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 600px) {
          .timeline-line {
            left: 20px !important;
          }
          .timeline-node {
            width: 40px !important;
            height: 40px !important;
          }
          .timeline-item {
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
