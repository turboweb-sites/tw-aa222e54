import { Position } from '../types/game';

interface GameProps {
  snake: Position[];
  food: Position;
  gridSize: number;
  gameState: 'idle' | 'playing' | 'paused' | 'gameover';
}

export default function Game({ snake, food, gridSize, gameState }: GameProps) {
  const cellSize = 20;
  const boardSize = gridSize * cellSize;

  return (
    <div className="relative mx-auto" style={{ width: boardSize, height: boardSize }}>
      {/* Game Board */}
      <div 
        className="absolute inset-0 bg-gray-900 rounded-lg shadow-2xl"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`
        }}
      />

      {/* Snake */}
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-100 ${
            index === 0 
              ? 'bg-green-400 shadow-lg shadow-green-400/50 rounded-sm' 
              : 'bg-green-500 rounded-sm'
          }`}
          style={{
            left: segment.x * cellSize,
            top: segment.y * cellSize,
            width: cellSize - 2,
            height: cellSize - 2,
            margin: 1
          }}
        >
          {index === 0 && (
            <div className="w-full h-full relative">
              <div className="absolute top-1 left-1 w-1 h-1 bg-gray-900 rounded-full" />
              <div className="absolute top-1 right-1 w-1 h-1 bg-gray-900 rounded-full" />
            </div>
          )}
        </div>
      ))}

      {/* Food */}
      <div
        className="absolute bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"
        style={{
          left: food.x * cellSize + cellSize / 4,
          top: food.y * cellSize + cellSize / 4,
          width: cellSize / 2,
          height: cellSize / 2
        }}
      />

      {/* Overlay for idle/paused states */}
      {(gameState === 'idle' || gameState === 'paused') && (
        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
          <p className="text-white text-2xl font-semibold">
            {gameState === 'idle' ? 'Нажмите "Начать игру"' : 'Пауза'}
          </p>
        </div>
      )}
    </div>
  );
}