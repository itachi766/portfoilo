import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';
import TextReveal from './TextReveal';

const roles = ['VLSI Designer Engineer', 'Embedded Systems Engineer', 'Web Developer', 'AI AND ML Engineer'];

export default function Hero() {
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: any;
    const fullText = roles[currentRoleIdx];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause at complete text
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIdx, typingSpeed]);

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Blur Orbs */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
          
          {/* Hero Left Content */}
          <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
              <span 
                className="glass" 
                style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '0.4rem 1rem', 
                  borderRadius: '100px', 
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  color: 'var(--accent-purple)',
                  boxShadow: '0 0 10px rgba(168, 85, 247, 0.1)',
                }}
              >
                 Welcome to my universe
              </span>
            </div>

            <h1 style={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 1.1 }}>
              Hey, I'm <br />
              <span className="gradient-text-purple-cyan" style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.15))' }}>
                Rishik Kumar Singh
              </span>
            </h1>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', height: '2.5rem', color: 'var(--text-secondary)' }}>
              I am a <span style={{ color: 'var(--accent-cyan)', borderRight: '3px solid var(--accent-cyan)', paddingRight: '4px', animation: 'blink 0.75s step-end infinite' }}>{currentText}</span>
            </h2>

            <TextReveal
              tag="p"
              lines={[
                "Passionate about VLSI design, embedded systems, and machine learning",
                "with hands-on experience in embedded C, Python, VLSI, and EDA tools.",
                "Skilled in working from transistor-level concepts to intelligent hardware,",
                "with a strong focus on building efficient, next-generation intelligent systems."
              ]}
              staggerDelay={0.15}
              baseDelay={0.4}
              style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0.5rem 0' }}
            />

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="glass-purple"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  backgroundColor: 'var(--accent-purple)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
                  transition: 'var(--transition-smooth)',
                }}
              >
                Message <MessageSquare size={18} />
              </a>
              
              <a 
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '12px',
                  transition: 'var(--transition-smooth)',
                }}
                className="btn-secondary"
              >
                View Works <ExternalLink size={18} />
              </a>
            </div>

            {/* Micro Dashboard */}
            <div 
              className="glass" 
              style={{
                marginTop: '2rem',
                padding: '1.25rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(12, 15, 36, 0.4)',
                borderRadius: '12px',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', display: 'inline-block', boxShadow: '0 0 8px var(--accent-green)' }}></span>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span>Active & Designing New Realities</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>$</span> npm run creative-flow
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                &gt; compiling dreams into 60fps glassmorphic code... <span style={{ color: 'var(--accent-pink)' }}>Done!</span>
              </div>
            </div>

          </div>

          {/* Hero Right Media */}
          <div className="hero-media" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div 
              style={{
                position: 'relative',
                width: '320px',
                height: '320px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Spinning Decorative Ring 1 */}
              <div 
                className="animate-rotate" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '1.5px dashed var(--accent-purple)',
                  opacity: 0.3,
                  pointerEvents: 'none',
                }}
              />
              
              {/* Spinning Decorative Ring 2 */}
              <div 
                className="animate-rotate" 
                style={{
                  position: 'absolute',
                  width: '108%',
                  height: '108%',
                  borderRadius: '50%',
                  border: '1px solid var(--accent-cyan)',
                  opacity: 0.15,
                  animationDirection: 'reverse',
                  pointerEvents: 'none',
                }}
              />

              {/* Glowing Shield Ring */}
              <div 
                className="animate-pulse-glow" 
                style={{
                  position: 'absolute',
                  width: '92%',
                  height: '92%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(6, 182, 212, 0.4))',
                  filter: 'blur(10px)',
                  zIndex: 0,
                  opacity: 0.7,
                }}
              />

              {/* Avatar Image Container */}
              <div 
                className="animate-float" 
                style={{
                  position: 'relative',
                  width: '90%',
                  height: '90%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid var(--bg-primary)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
                  zIndex: 1,
                  background: 'var(--bg-secondary)',
                }}
              >
                <img 
                  src="./avatar.png" 
                  alt="Anime Avatar Rishik.Dev" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Accent Floating Badges */}
              <span 
                className="glass animate-float-delayed"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '-10px',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: '100px',
                  color: 'var(--accent-cyan)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  backgroundColor: 'rgba(12, 15, 36, 0.85)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  zIndex: 2,
                }}
              >
                ⚛️ AI & ML 
              </span>

              <span 
                className="glass animate-float"
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '-20px',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: '100px',
                  color: 'var(--accent-pink)',
                  border: '1px solid rgba(244, 63, 145, 0.3)',
                  backgroundColor: 'rgba(12, 15, 36, 0.85)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  zIndex: 2,
                }}
              >
                💻 VLSI & ES
              </span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
            text-align: center !important;
          }
          .hero-content {
            align-items: center !important;
          }
          .hero-content p {
            margin: 0.5rem auto !important;
          }
          .hero-media {
            order: -1 !important;
          }
          h1 {
            font-size: 2.8rem !important;
          }
        }
        .btn-secondary:hover {
          border-color: var(--accent-cyan) !important;
          color: var(--accent-cyan) !important;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.15);
        }
      `}</style>
    </section>
  );
}
