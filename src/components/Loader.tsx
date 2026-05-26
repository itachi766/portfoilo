import { useEffect, useState } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const [bootLogIdx, setBootLogIdx] = useState(0);
  
  const bootLogs = [
    '⚡ Initializing core modules...',
    '🎨 Compiling visual design systems...',
    '⚙️ Securing connection to grid...',
    '🚀 Compiles successful. Beaming in...'
  ];

  useEffect(() => {
    // Cycle through terminal boot logs as progress loads
    const logInterval = setInterval(() => {
      setBootLogIdx((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev));
    }, 450);

    // 2.2s total presentation timer to allow terminal logs to fully display
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Wait for the transition to finish before unmounting
      setTimeout(onComplete, 1000);
    }, 2200);

    return () => {
      clearInterval(logInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: isExiting ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
        transition: 'transform 1s cubic-bezier(0.85, 0, 0.15, 1)',
        overflow: 'hidden',
      }}
    >
      {/* 1. Ambient Background Glow Orbs */}
      <div 
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--accent-purple-rgb), 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          top: '20%',
          left: '25%',
          animation: 'float-slow 8s ease-in-out infinite alternate',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--accent-cyan-rgb), 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          bottom: '20%',
          right: '25%',
          animation: 'float-slow 8s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* 2. Glassmorphic Core Container */}
      <div
        style={{
          padding: '2.5rem 3rem',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(var(--accent-purple-rgb), 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          transform: isExiting ? 'scale(0.4) translateY(-100px) rotate(-3deg)' : 'scale(1)',
          opacity: isExiting ? 0 : 1,
          transition: 'transform 0.8s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.8s ease-in-out, border-color 0.5s ease',
          maxWidth: '450px',
          width: '90%',
          textAlign: 'center',
          zIndex: 2,
        }}
        className="loader-card"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-cyan)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(152, 140, 108, 0.25)';
        }}
      >
        {/* Centered Glowing Logo Emblem */}
        <div 
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 0 35px rgba(152, 140, 108, 0.3)',
            animation: 'pulse-symbol 2s infinite alternate',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>

        {/* Text Logo */}
        <h1 
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: 'var(--text-primary)',
            marginTop: '0.25rem',
          }}
        >
          RISHIK<span style={{ color: 'var(--accent-cyan)' }}>.DEV</span>
        </h1>
        
        {/* Loading Progress Bar */}
        <div 
          style={{
            width: '180px',
            height: '3px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '100px',
            overflow: 'hidden',
            margin: '0.25rem 0',
          }}
        >
          <div 
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
              animation: 'load-bar 2.1s cubic-bezier(0.85, 0, 0.15, 1) forwards',
            }}
          />
        </div>

        {/* Cyberpunk Monospaced Terminal Status Feed */}
        <div 
          style={{
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            color: 'var(--accent-cyan)',
            minHeight: '20px',
            marginTop: '0.25rem',
            transition: 'all 0.3s ease',
            opacity: 0.85,
            textShadow: '0 0 8px rgba(6, 182, 212, 0.2)',
          }}
        >
          {bootLogs[bootLogIdx]}
        </div>

      </div>

      <style>{`
        @keyframes pulse-symbol {
          0% { transform: scale(0.95); box-shadow: 0 0 25px rgba(152, 140, 108, 0.2); }
          100% { transform: scale(1.05); box-shadow: 0 0 45px rgba(197, 186, 155, 0.4); }
        }
        @keyframes load-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        @keyframes float-slow {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -30px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
