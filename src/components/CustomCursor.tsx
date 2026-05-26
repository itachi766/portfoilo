import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile touch devices
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch);
    };
    checkMobile();

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Attach window event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Track clickables for hover highlights
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .glass-hover, .skills-deck > div, .card-glow-container'
      );
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    // Setup initial listeners and dynamic DOM watcher
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [isMobile]);

  // Smooth trailing effect using animation frame (lerp interpolation physics)
  useEffect(() => {
    if (isMobile || isHidden) return;

    let animFrameId: number;

    const updateTrailing = () => {
      setTrailingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.16, // Lerp factor (0.16) coordinates the smooth lag/fluid trailing
          y: prev.y + dy * 0.16,
        };
      });
      animFrameId = requestAnimationFrame(updateTrailing);
    };

    animFrameId = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animFrameId);
  }, [position, isHidden, isMobile]);

  if (isMobile || isHidden) return null;

  return (
    <>
      {/* 1. Core cursor dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isClicking ? 'var(--accent-pink)' : isHovering ? 'var(--accent-cyan)' : 'var(--accent-purple)',
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${isClicking ? 0.75 : isHovering ? 1.25 : 1})`,
          transition: 'transform 0.05s ease-out, background-color 0.2s ease',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: isHovering 
            ? '0 0 10px var(--accent-cyan)' 
            : '0 0 10px var(--accent-purple)',
        }}
      />

      {/* 2. Trailing glowing ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '44px' : '26px',
          height: isHovering ? '44px' : '26px',
          borderRadius: '50%',
          border: isClicking 
            ? '1.5px solid var(--accent-pink)' 
            : isHovering 
              ? '1.5px solid var(--accent-cyan)' 
              : '1.5px solid rgba(168, 85, 247, 0.45)',
          transform: `translate3d(${trailingPosition.x - (isHovering ? 22 : 13)}px, ${trailingPosition.y - (isHovering ? 22 : 13)}px, 0) scale(${isClicking ? 0.95 : 1})`,
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, transform 0.08s ease-out',
          pointerEvents: 'none',
          zIndex: 9998,
          boxShadow: isHovering 
            ? '0 0 15px rgba(6, 182, 212, 0.25)' 
            : '0 0 10px rgba(168, 85, 247, 0.08)',
        }}
      />

      {/* Global CSS to hide default cursor on desktop screens */}
      <style>{`
        @media (min-width: 769px) {
          body, a, button, input, textarea, select, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
