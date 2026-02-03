import { Direction } from '../types/game';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  gameState: 'idle' | 'playing' | 'paused' | 'gameover';
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onDirectionChange: (direction: Direction) => void;
  difficulty: 'easy' | 'medium' | 'hard';
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export default function Controls({
  gameState,
  onStart,
  onPause,
  onResume,
  onDirectionChange,
  difficulty,
  onDifficultyChange
}: ControlsProps) {
  return (
    <div className="space-y-6">
      {/* Game Controls */}
      <div className="flex justify-center gap-4">
        {gameState === 'idle' || gameState === 'gameover' ? (
          <button
            onClick={onStart}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <Play className="h-5 w-5" />
            Начать игру
          </button>
        ) : gameState === 'playing' ? (
          <button
            onClick={onPause}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <Pause className="h-5 w-5" />
            Пауза
          </button>
        ) : (
          <button
            onClick={onResume}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <RotateCcw className="h-5 w-5" />
            Продолжить
          </button>
        )}
      </div>

      {/* Difficulty */}
      {gameState === 'idle' && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onDifficultyChange('easy')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              difficulty === 'easy'
                ? 'bg-green-500 text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            Легко
          </button>
          <button
            onClick={() => onDifficultyChange('medium')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              difficulty === 'medium'
                ? 'bg-yellow-500 text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            Средне
          </button>
          <button
            onClick={() => onDifficultyChange('hard')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              difficulty === 'hard'
                ? 'bg-red-500 text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            Сложно
          </button>
        </div>
      )}

      {/* Direction Controls */}
      {gameState === 'playing' && (
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-2 w-48">
            <div />
            <button
              onClick={() => onDirectionChange('up')}
              className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all hover:scale-105"
            >
              <ArrowUp className="h-6 w-6 mx-auto" />
            </button>
            <div />
            <button
              onClick={() => onDirectionChange('left')}
              className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all hover:scale-105"
            >
              <ArrowLeft className="h-6 w-6 mx-auto" />
            </button>
            <button
              onClick={() => onDirectionChange('down')}
              className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all hover:scale-105"
            >
              <ArrowDown className="h-6 w-6 mx-auto" />
            </button>
            <button
              onClick={() => onDirectionChange('right')}
              className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all hover:scale-105"
            >
              <ArrowRight className="h-6 w-6 mx-auto" />
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-white/60 text-sm">
        <p>Используйте стрелки или кнопки для управления</p>
        <p>Собирайте красную еду, чтобы расти</p>
      </div>
    </div>
  );
}