import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { ArrowUp, Flame } from 'lucide-react';

const GithubIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer 
      className="glass" 
      style={{
        borderTop: '1px solid var(--border-color)',
        padding: '2.5rem 0',
        borderRadius: '0px',
        backgroundColor: 'rgba(6, 8, 20, 0.4)',
        marginTop: '6rem',
      }}
    >
      <div 
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        {/* Branding copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            RISHIK<span style={{ color: 'var(--accent-cyan)' }}>.DEV</span>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Rishik Kumar Singh. All rights reserved.
          </span>
          <div 
            style={{ 
              fontSize: '0.78rem', 
              color: 'var(--accent-cyan)', 
              marginTop: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'monospace',
              textShadow: '0 0 8px rgba(6, 182, 212, 0.3)'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-cyan)', display: 'inline-block', animation: 'pulse-dot 1s infinite alternate' }}></span>
            <span>Local Time: {time}</span>
          </div>
        </div>

        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          
          <a
            href="https://github.com/itachi766"
            target="_blank"
            rel="noreferrer"
            className="social-bubble"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--text-secondary)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <GithubIcon />
          </a>

          <a
            href="https://www.linkedin.com/in/rishik-vlsi-engineer/"
            target="_blank"
            rel="noreferrer"
            className="social-bubble"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--text-secondary)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <LinkedinIcon />
          </a>

          <a
            href="https://x.com/Itachi_76674"
            target="_blank"
            rel="noreferrer"
            className="social-bubble"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--text-secondary)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <TwitterIcon />
          </a>

          <a
            href="https://www.instagram.com/rishikuuuuu/"
            target="_blank"
            rel="noreferrer"
            className="social-bubble"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--text-secondary)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <InstagramIcon />
          </a>

        </div>

        {/* Back to top anchor */}
        <a
          href="#home"
          onClick={scrollToTop}
          className="back-to-top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--accent-purple)',
            padding: '0.5rem 1rem',
            borderRadius: '100px',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            transition: 'var(--transition-smooth)',
          }}
        >
          Back To Top <ArrowUp size={14} />
        </a>

      </div>

      {/* Anime style subtle easter-egg subtext */}
      <div 
        style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem', 
          fontSize: '0.72rem', 
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.3rem'
        }}
      >
        Coded By <Flame size={12} style={{ color: 'var(--accent-pink)' }} /> Rishik AKA Itachi.
      </div>

      <style>{`
        .social-bubble:hover {
          color: var(--accent-cyan) !important;
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
          transform: translateY(-3px);
        }
        .back-to-top:hover {
          color: var(--text-primary) !important;
          background-color: var(--accent-purple);
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
          border-color: var(--accent-purple) !important;
        }
        @keyframes pulse-dot {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </footer>
  );
}
