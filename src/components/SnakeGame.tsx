import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Award, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const TILE_COUNT = 20; // 20x20 grid (400x400 canvas)
const INITIAL_SPEED = 120; // Lower is faster (ms per tick)

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game states
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 }); // Moving up initially
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Keep direction ref to prevent rapid double-taps causing self-collision
  const dirRef = useRef<Point>({ x: 0, y: -1 });
  dirRef.current = direction;

  // Generate random food position not on snake
  const generateFood = (currentSnake: Point[]): Point => {
    let newFood: Point;
    let onSnake = true;
    while (onSnake) {
      newFood = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT),
      };
      onSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    }
    return newFood!;
  };

  // Start / Restart Game
  const startGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleDirectionChange = (newDir: Point) => {
    if (!isPlaying || gameOver) return;
    
    // Prevent 180-degree opposite turns
    if (newDir.x !== 0 && dirRef.current.x !== 0) return;
    if (newDir.y !== 0 && dirRef.current.y !== 0) return;
    
    setDirection(newDir);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          handleDirectionChange({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          handleDirectionChange({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          handleDirectionChange({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          handleDirectionChange({ x: 1, y: 0 });
          break;
        case 'Space':
        case ' ':
          e.preventDefault();
          if (gameOver) {
            startGame();
          } else {
            setIsPlaying((prev) => !prev);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Main game tick loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const tick = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        // Wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= TILE_COUNT ||
          newHead.y < 0 ||
          newHead.y >= TILE_COUNT
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Self collision
        const selfCollision = prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        );
        if (selfCollision) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision check
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem('snakeHighScore', nextScore.toString());
            }
            return nextScore;
          });
          setFood(generateFood(prevSnake));
        } else {
          // Remove tail if didn't eat food
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(tick, INITIAL_SPEED);
    return () => clearInterval(intervalId);
  }, [isPlaying, gameOver, direction, food, highScore]);

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear board with deep forest moss color
    ctx.fillStyle = '#101c15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw soft botanical green grid lines
    ctx.strokeStyle = 'rgba(124, 169, 130, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= TILE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(i * GRID_SIZE, 0);
      ctx.lineTo(i * GRID_SIZE, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * GRID_SIZE);
      ctx.lineTo(canvas.width, i * GRID_SIZE);
      ctx.stroke();
    }

    // Draw Snake
    snake.forEach((segment, index) => {
      // Create elegant gradient colors for the snake body
      ctx.fillStyle = index === 0 ? '#7ca982' : '#9cb0a3'; // Lush Fern Green head & Willow Sage body
      ctx.beginPath();
      ctx.roundRect(
        segment.x * GRID_SIZE + 1.5,
        segment.y * GRID_SIZE + 1.5,
        GRID_SIZE - 3,
        GRID_SIZE - 3,
        4
      );
      ctx.fill();
    });

    // Draw glowing Food
    ctx.fillStyle = '#e9d985'; // Warm Sunflower Sunbeam gold nectar
    ctx.shadowColor = '#e9d985';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2 - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    // Reset shadow blur
    ctx.shadowBlur = 0;

  }, [snake, food]);

  return (
    <section id="arcade" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">Interactive Arcade</h2>
        
        <div className="arcade-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center', marginTop: '1.5rem' }}>
          
          {/* Left Side: Game Controller Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            
            {/* Score Deck */}
            <div style={{ display: 'flex', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
              
              {/* Score card */}
              <div className="glass" style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                <Trophy size={20} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Score</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{score}</span>
                </div>
              </div>

              {/* High Score card */}
              <div className="glass" style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                <Award size={20} style={{ color: 'var(--accent-purple)' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>High Score</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{highScore}</span>
                </div>
              </div>

            </div>

            {/* Game Canvas Container */}
            <div 
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0,0,0,0.5), 0 0 20px rgba(152, 140, 108, 0.1)',
                border: '1.5px solid var(--border-color)',
                width: '100%',
                maxWidth: '400px',
                height: '400px',
                aspectRatio: '1/1',
              }}
            >
              <canvas 
                ref={canvasRef}
                width={400}
                height={400}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                }}
              />

              {/* Start overlay screen */}
              {!isPlaying && !gameOver && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(10, 17, 13, 0.85)', backdropFilter: 'blur(4px)', gap: '1rem', padding: '2rem' }}>
                  <Trophy size={48} style={{ color: 'var(--accent-purple)', filter: 'drop-shadow(0 0 10px rgba(124, 169, 130, 0.3))' }} />
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>Snake Arcade</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: '1.5', textAlign: 'center' }}>
                    Press W-A-S-D or Arrow keys to steer your snake. Collect golden dots to score!
                  </p>
                  <button 
                    onClick={startGame}
                    className="glass-purple animate-pulse-glow"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--accent-purple)', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Start Game <Play size={16} fill="#fff" />
                  </button>
                </div>
              )}

              {/* Game Over overlay screen */}
              {gameOver && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(10, 17, 13, 0.9)', backdropFilter: 'blur(5px)', gap: '1rem', padding: '2rem' }}>
                  <Award size={48} style={{ color: 'var(--accent-pink)', filter: 'drop-shadow(0 0 10px rgba(244, 239, 226, 0.3))' }} />
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-pink)' }}>Game Over</h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Your Score: <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{score}</span>
                  </div>
                  <button 
                    onClick={startGame}
                    className="glass-purple"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--accent-purple)', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Play Again <RotateCcw size={16} />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Description and D-pad controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Take a Quick Break!</h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.7' }}>
              Want to see real-time hardware clock cycles and RTL logical updates in a simplified grid? Take a breather and play a quick round of retro Snake! This game is built from scratch utilizing the HTML5 Canvas API inside React hooks, running with optimal hardware rendering performance.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <div>🎮 **Desktop Controls**: Use the arrow keys, W-A-S-D keys, or Spacebar to pause/resume.</div>
              <div>📱 **Mobile Controls**: Tap the D-pad button interface below to control direction.</div>
            </div>

            {/* Mobile D-Pad Controller */}
            <div 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                marginTop: '1rem',
                gap: '0.5rem',
                width: '100%',
                maxWidth: '220px',
                margin: '1.5rem auto 0 auto'
              }}
              className="dpad-controller"
            >
              {/* Up */}
              <button 
                onClick={() => handleDirectionChange({ x: 0, y: -1 })}
                className="glass"
                style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '10px', cursor: 'pointer' }}
                aria-label="Up"
              >
                <ArrowUp size={20} style={{ color: 'var(--accent-purple)' }} />
              </button>

              {/* Left / Right Row */}
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                <button 
                  onClick={() => handleDirectionChange({ x: -1, y: 0 })}
                  className="glass"
                  style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '10px', cursor: 'pointer' }}
                  aria-label="Left"
                >
                  <ArrowLeft size={20} style={{ color: 'var(--accent-cyan)' }} />
                </button>

                <button 
                  onClick={() => handleDirectionChange({ x: 1, y: 0 })}
                  className="glass"
                  style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '10px', cursor: 'pointer' }}
                  aria-label="Right"
                >
                  <ArrowRight size={20} style={{ color: 'var(--accent-cyan)' }} />
                </button>
              </div>

              {/* Down */}
              <button 
                onClick={() => handleDirectionChange({ x: 0, y: 1 })}
                className="glass"
                style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '10px', cursor: 'pointer' }}
                aria-label="Down"
              >
                <ArrowDown size={20} style={{ color: 'var(--accent-purple)' }} />
              </button>

            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .arcade-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
