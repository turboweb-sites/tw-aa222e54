import { useEffect, useRef } from 'react';
import { Position } from '../types/game';
import { Pause, Play } from 'lucide-react';

interface GameProps {
  snake: Position[];
  food: Position;
  onDirectionChange: (direction: string) => void;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
}

export default function Game({ snake, food, onDirectionChange, isPaused, onPause, onResume }: GameProps) {
  const boardSize = 20;
  const cellSize = 20;
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (isPaused) {
          onResume();
        } else {
          onPause();
        }
        return;
      }

      if (!isPaused) {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            onDirectionChange('UP');
            break;
          case 'ArrowDown':
            e.preventDefault();
            onDirectionChange('DOWN');
            break;
          case 'ArrowLeft':
            e.preventDefault();
            onDirectionChange('LEFT');
            break;
          case 'ArrowRight':
            e.preventDefault();
            onDirectionChange('RIGHT');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onDirectionChange, isPaused, onPause, onResume]);

  return (
    <div className="relative flex flex-col items-center" ref={gameRef}>
      <div 
        className="relative bg-gray-900 border-4 border-gray-700 rounded-lg shadow-inner"
        style={{
          width: boardSize * cellSize,
          height: boardSize * cellSize
        }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: boardSize }).map((_, i) => (
            <div key={`h-${i}`}>
              <div
                className="absolute w-full border-t border-gray-600"
                style={{ top: i * cellSize }}
              />
              <div
                className="absolute h-full border-l border-gray-600"
                style={{ left: i * cellSize }}
              />
            </div>
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-100 ${
              index === 0 
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/50 z-20' 
                : 'bg-gradient-to-br from-green-500 to-emerald-600'
            } rounded-sm`}
            style={{
              left: segment.x * cellSize,
              top: segment.y * cellSize,
              width: cellSize - 2,
              height: cellSize - 2,
              margin: 1
            }}
          >
            {index === 0 && (
              <div className="absolute inset-1 bg-white/20 rounded-sm animate-pulse" />
            )}
          </div>
        ))}

        {/* Food */}
        <div
          className="absolute bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/50 animate-pulse z-10"
          style={{
            left: food.x * cellSize + 2,
            top: food.y * cellSize + 2,
            width: cellSize - 4,
            height: cellSize - 4
          }}
        >
          <div className="absolute inset-1 bg-white/30 rounded-full" />
        </div>

        {/* Pause overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm rounded-lg z-30">
            <div className="text-center">
              <Pause className="w-16 h-16 text-white mb-4 mx-auto" />
              <p className="text-white text-2xl font-bold">ПАУЗА</p>
              <p className="text-gray-300 mt-2">Нажмите пробел для продолжения</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button
          onClick={() => !isPaused && onDirectionChange('UP')}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          ↑
        </button>
        <div />
        <button
          onClick={() => !isPaused && onDirectionChange('LEFT')}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          ←
        </button>
        <button
          onClick={() => isPaused ? onResume() : onPause()}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
        <button
          onClick={() => !isPaused && onDirectionChange('RIGHT')}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          →
        </button>
        <div />
        <button
          onClick={() => !isPaused && onDirectionChange('DOWN')}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          ↓
        </button>
        <div />
      </div>
    </div>
  );
}