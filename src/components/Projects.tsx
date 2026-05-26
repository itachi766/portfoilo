import type { MouseEvent } from 'react';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  color: string; // Theme color (purple, cyan, pink)
}

const projects: Project[] = [
  {
    title: 'Human Detection & Tracking System',
    description: 'A high-performance, real-time Human Detection and tracking system in Python using YOLOv8 and MobileNet-SSD. Built with OpenCV for both static images and live webcam video feeds.',
    image: './human_detection.png',
    tags: ['Python', 'OpenCV', 'YOLOv8', 'MobileNet-SSD'],
    github: 'https://github.com/itachi766/Human-detection-openCV.git',
    live: 'https://github.com/itachi766/Human-detection-openCV.git',
    color: 'var(--accent-purple)',
  },
  {
    title: 'Kage AI Security Agent',
    description: 'An AI-powered network monitoring dashboard. Features animated cyber threat maps, automatic anomaly prediction models, and a sleek hacker-terminal aesthetic.',
    image: './kage.png',
    tags: ['Python', 'FastAPI', 'PyTorch', 'TypeScript'],
    github: 'https://github.com/Rishik/Kage-AI',
    live: 'https://kage-security.dev',
    color: 'var(--accent-cyan)',
  },
  {
    title: 'Senpai VN Engine',
    description: 'A lightweight canvas-driven web engine designed to write, script, and distribute fully animated anime visual novels directly in the browser with 60 FPS performance.',
    image: './senpai.png',
    tags: ['TypeScript', 'HTML5 Canvas', 'CSS Grid', 'Firebase'],
    github: 'https://github.com/Rishik/Senpai-Engine',
    live: 'https://senpai-engine.org',
    color: 'var(--accent-pink)',
  },
];

export default function Projects() {
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div 
          className="projects-grid" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '2.5rem',
            marginTop: '1.5rem'
          }}
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="glass card-glow-container"
              onMouseMove={handleMouseMove}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                transition: 'var(--transition-smooth)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.color;
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px ${project.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Active Radial Cursor Glow Backdrop */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${project.color}10, transparent 80%)`,
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* Project Image Header */}
              <div 
                style={{
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                  position: 'relative',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  zIndex: 1,
                }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="project-thumbnail"
                />
                
                {/* Visual Accent Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to bottom, transparent 30%, ${project.color}15 100%)`,
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Card Body */}
              <div 
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  flexGrow: 1,
                  zIndex: 1,
                }}
              >
                {/* Title */}
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', flexGrow: 1 }}>
                  {project.description}
                </p>

                {/* Stack Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.5rem 0' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions Link Footer */}
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '1rem',
                    marginTop: '0.5rem'
                  }}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--text-secondary)',
                    }}
                    className="proj-link"
                  >
                    <GithubIcon size={16} /> Code
                  </a>
                  
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: project.color,
                    }}
                    className="proj-link"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

      <style>{`
        .card-glow-container:hover .project-thumbnail {
          transform: scale(1.05);
        }
        .proj-link {
          transition: var(--transition-fast);
        }
        .proj-link:hover {
          color: var(--text-primary) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
