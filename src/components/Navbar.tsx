import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Arcade', href: '#arcade' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const LogoIcon = () => (
  <svg 
    viewBox="0 0 120 70" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{
      height: '28px',
      width: 'auto',
      display: 'inline-block',
      filter: 'drop-shadow(0 0 8px rgba(197, 186, 155, 0.25))',
    }}
  >
    {/* Left Side Cyan/Gold Circuit Tracks */}
    <path 
      d="M 5 22 L 35 22 L 50 7 L 55 7" 
      stroke="var(--accent-cyan)" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="58" cy="7" r="3.5" fill="var(--accent-cyan)" />

    <path 
      d="M 5 35 L 30 35 L 43 22 L 55 22" 
      stroke="var(--accent-cyan)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="58" cy="22" r="2.5" fill="var(--accent-cyan)" />

    <path 
      d="M 5 48 L 25 48 L 40 33 L 40 28" 
      stroke="var(--accent-cyan)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="40" cy="25" r="2.5" fill="var(--accent-cyan)" />

    {/* Left Side Grey Thick Path (Accent Line) */}
    <path 
      d="M 18 42 L 38 22 L 50 22" 
      stroke="var(--text-muted)" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.85"
    />

    {/* Right Side Cyan/Gold Circuit Tracks (Mirrored & Slightly Offset) */}
    <path 
      d="M 115 48 L 85 48 L 70 63 L 65 63" 
      stroke="var(--accent-purple)" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="62" cy="63" r="3.5" fill="var(--accent-purple)" />

    <path 
      d="M 115 35 L 90 35 L 77 48 L 65 48" 
      stroke="var(--accent-purple)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="62" cy="48" r="2.5" fill="var(--accent-purple)" />

    <path 
      d="M 115 22 L 95 22 L 80 37 L 80 42" 
      stroke="var(--accent-purple)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="80" cy="45" r="2.5" fill="var(--accent-purple)" />

    {/* Right Side Grey Thick Path (Accent Line) */}
    <path 
      d="M 102 28 L 82 48 L 70 48" 
      stroke="var(--text-muted)" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.85"
    />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Background change on scroll
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = navItems.map((item) => item.href.substring(1));
      let currentSection = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on viewport height
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offsetPosition = element.offsetTop - 85;
      const customLenis = (window as any).customLenis;
      if (customLenis) {
        customLenis.scrollTo(offsetPosition, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav 
      className={`navbar-wrapper`} 
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: 100,
        padding: scrolled ? '0.75rem 0' : '1.5rem 0',
        transition: 'var(--transition-smooth)',
        backgroundColor: scrolled ? 'rgba(6, 8, 20, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      }}
    >
      <div 
        className="container" 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.4rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
          }}
        >
          <LogoIcon />
          <span>RISHIK<span style={{ color: 'var(--accent-cyan)' }}>.DEV</span></span>
        </a>

        {/* Desktop Menu */}
        <ul 
          style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
          }}
          className="desktop-menu"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    padding: '0.5rem 0',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    position: 'relative',
                  }}
                  className="nav-link"
                >
                  {item.label}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: isActive ? '100%' : '0%',
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
                      transition: 'var(--transition-smooth)',
                    }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="glass"
          style={{
            position: 'absolute',
            top: '100%',
            left: '1rem',
            right: '1rem',
            marginTop: '0.5rem',
            borderRadius: '12px',
            padding: '1.5rem',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            listStyle: 'none',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  padding: '0.25rem 0',
                  borderBottom: isActive ? '1px solid rgba(6, 182, 212, 0.15)' : 'none',
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}

      {/* Embedded Mobile CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        .nav-link:hover {
          color: var(--text-primary) !important;
        }
        .nav-link:hover span {
          width: 100% !important;
        }
      `}</style>
    </nav>
  );
}
