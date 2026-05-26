import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  size: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(124, 169, 130, 0.16)', // Lush Fern Green
      'rgba(233, 217, 133, 0.16)', // Sunflower Gold
      'rgba(244, 239, 226, 0.14)', // Morning Dew Jasmine Cream
    ];
    
    // Spawn 25 drifting glowing particles
    const spawnedParticles: Particle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 12 + 4, // Particle size from 4px to 16px
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * -15}s`, // Negative delay so they are pre-spawned across the screen on load
      duration: `${Math.random() * 20 + 20}s`, // Slower drift speed (20s to 40s)
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setParticles(spawnedParticles);
  }, []);

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            filter: 'blur(3px)',
            boxShadow: `0 0 12px ${p.color}`,
            animation: `floatUp ${p.duration} linear infinite`,
            animationDelay: p.delay,
            opacity: 0.8,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-105vh) scale(1.3) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
