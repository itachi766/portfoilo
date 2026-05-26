import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  id?: string; // Optional ID anchor prop
  animationType?: 'fade-up' | 'zoom-in' | 'zoom-out' | 'zoom-in-up';
}

export default function ScrollReveal({ 
  children, 
  width = '100%', 
  id,
  animationType = 'zoom-in-up' // Elegant hybrid scale-up reveal as default
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05, // Trigger when 5% of the element is visible
        rootMargin: '-40px 0px -40px 0px', // Trigger slightly inside the viewport for premium spacing
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    
    switch (animationType) {
      case 'zoom-in':
        return 'translate3d(0, 0, 0) scale(0.92)';
      case 'zoom-out':
        return 'translate3d(0, 0, 0) scale(1.08)';
      case 'zoom-in-up':
        return 'translate3d(0, 40px, 0) scale(0.94)';
      case 'fade-up':
      default:
        return 'translate3d(0, 50px, 0) scale(1)';
    }
  };

  return (
    <div
      ref={ref}
      id={id}
      style={{
        width,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}
