import { useState } from 'react';
import { Layers, Database, Cpu, CircuitBoard } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0 to 100
  color: string; // CSS color
}

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: <Layers size={20} />,
    skills: [
      { name: 'React / Next.js', level: 95, color: 'var(--accent-purple)' },
      { name: 'TypeScript', level: 90, color: 'var(--accent-cyan)' },
      { name: 'CSS / Web Graphics', level: 92, color: 'var(--accent-pink)' },
      { name: 'Three.js / WebGL', level: 75, color: 'var(--accent-purple)' },
    ],
  },
  {
    category: 'Backend',
    icon: <Database size={20} />,
    skills: [
      { name: 'Node.js / Express', level: 88, color: 'var(--accent-cyan)' },
      { name: 'Python / FastAPI', level: 82, color: 'var(--accent-purple)' },
      { name: 'GraphQL / REST APIs', level: 85, color: 'var(--accent-pink)' },
      { name: 'SQL & NoSQL Databases', level: 86, color: 'var(--accent-cyan)' },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: <Cpu size={20} />,
    skills: [
      { name: 'Git & GitHub Actions', level: 90, color: 'var(--accent-pink)' },
      { name: 'Docker Containers', level: 78, color: 'var(--accent-purple)' },
      { name: 'AWS & Cloud Services', level: 80, color: 'var(--accent-cyan)' },
      { name: 'Linux / Shell Scripting', level: 85, color: 'var(--accent-pink)' },
    ],
  },
   {
    category: 'VLSI',
    icon: <CircuitBoard size={20} />,
    skills: [
      { name: 'RTL Design', level: 90, color: 'var(--accent-pink)' },
      { name: 'Verilog/ VHDL', level: 78, color: 'var(--accent-purple)' },
      { name: 'Circuit Design', level: 80, color: 'var(--accent-cyan)' },
      { name: 'Xilinx ', level: 85, color: 'var(--accent-pink)' },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Frontend');

  const currentGroup = skillGroups.find(group => group.category === activeTab) || skillGroups[0];

  return (
    <section id="skills" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        
        {/* Navigation Tabs */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          {skillGroups.map((group) => {
            const isActive = activeTab === group.category;
            return (
              <button
                key={group.category}
                onClick={() => setActiveTab(group.category)}
                className="glass"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '100px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'rgba(6, 182, 212, 0.1)' : 'var(--bg-card)',
                  boxShadow: isActive ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none',
                  transition: 'var(--transition-smooth)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                {group.icon}
                {group.category}
              </button>
            );
          })}
        </div>

        {/* Skills Deck Grid */}
        <div 
          className="skills-deck"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.75rem',
            minHeight: '220px'
          }}
        >
          {currentGroup.skills.map((skill) => (
            <div
              key={skill.name}
              className="glass"
              style={{
                padding: '1.75rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = skill.color;
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${skill.color}15`;
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {skill.name}
                </span>
                <span 
                  style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 800, 
                    color: skill.color,
                    fontFamily: 'monospace'
                  }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div 
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '100px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Active Level Bar */}
                <div 
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${skill.color}, #ffffff)`,
                    borderRadius: '100px',
                    boxShadow: `0 0 10px ${skill.color}`,
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>

              {/* Subtext info */}
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: skill.color }}></span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'} Level Proficiency
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
