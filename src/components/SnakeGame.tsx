import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Activity, Zap } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 120;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          setIsPaused(false);
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          setIsPaused(false);
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          setIsPaused(false);
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          setIsPaused(false);
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-black terminal-border">
      <div className="flex justify-between w-full items-center px-2">
        <div className="flex items-center gap-2">
          <Activity className="text-glitch-magenta w-4 h-4" />
          <span className="text-2xl text-glitch-magenta flicker">DATA_VAL: {score.toString().padStart(4, '0')}</span>
        </div>
        <div className="text-glitch-cyan text-sm uppercase tracking-widest opacity-70">
          {gameOver ? 'CRITICAL_FAILURE' : isPaused ? 'STANDBY' : 'EXECUTING'}
        </div>
      </div>

      <div 
        className="relative bg-black border-2 border-glitch-cyan/30 overflow-hidden"
        style={{ 
          width: GRID_SIZE * 16, 
          height: GRID_SIZE * 16,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`${i === 0 ? 'bg-glitch-cyan shadow-[0_0_8px_#00ffff]' : 'bg-glitch-cyan/40'}`}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="bg-glitch-magenta shadow-[0_0_12px_#ff00ff] animate-pulse"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
          }}
        />

        {/* Overlays */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold text-glitch-magenta uppercase tracking-tighter flicker" data-text="SYSTEM_HALT">SYSTEM_HALT</h2>
            <button 
              onClick={resetGame}
              className="px-6 py-1 border-2 border-glitch-cyan text-glitch-cyan hover:bg-glitch-cyan hover:text-black transition-all uppercase text-sm"
            >
              REBOOT_PROCESS
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-glitch-cyan animate-pulse uppercase text-xs tracking-[0.2em]">INPUT_REQUIRED_TO_PROCEED</span>
          </div>
        )}
      </div>

      <div className="text-[10px] text-glitch-cyan/40 text-center uppercase">
        DIR_INPUT: ARROWS | STATE_TOGGLE: SPACE
      </div>
    </div>
  );
};
