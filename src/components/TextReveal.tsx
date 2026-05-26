import { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  lines: string[];
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number; // Delay between each line (default 0.15s)
  baseDelay?: number; // Initial delay before the first line starts (default 0s)
}

export default function TextReveal({
  lines,
  tag = 'p',
  className = '',
  style = {},
  staggerDelay = 0.15,
  baseDelay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05, // Trigger when 5% of the element is visible
        rootMargin: '-20px 0px -20px 0px', // Responsive viewport margins
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const Tag = tag as any;

  return (
    <div 
      ref={containerRef} 
      style={{ display: 'block', width: '100%', ...style }}
      className={className}
    >
      {lines.map((line, index) => {
        const lineDelay = baseDelay + index * staggerDelay;
        
        return (
          <div 
            key={index} 
            style={{ 
              overflow: 'hidden', 
              display: 'block',
              margin: '0.15em 0'
            }}
          >
            <span
              style={{
                display: 'block',
                transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${lineDelay}s`,
                margin: 0,
              }}
            >
              <Tag style={{ margin: 0, display: 'inline', color: 'inherit', fontStyle: 'inherit', fontWeight: 'inherit', fontSize: 'inherit', fontFamily: 'inherit', lineHeight: 'inherit' }}>
                {line}
              </Tag>
            </span>
          </div>
        );
      })}
    </div>
  );
}
