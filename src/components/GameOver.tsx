import { Trophy, RefreshCw } from 'lucide-react';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export default function GameOver({ score, highScore, onRestart }: GameOverProps) {
  const isNewRecord = score === highScore && score > 0;

  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center">
      <div className="space-y-6">
        <div>
          <h2 className="text-5xl font-bold text-red-500 mb-2">GAME OVER</h2>
          <p className="text-gray-400 text-lg">Змейка врезалась!</p>
        </div>

        <div className="space-y-4">
          <div className="text-3xl">
            <span className="text-gray-400">Счёт: </span>
            <span className="font-bold text-white">{score}</span>
          </div>

          {isNewRecord && (
            <div className="flex items-center justify-center gap-2 text-yellow-500 animate-bounce">
              <Trophy className="w-8 h-8" />
              <span className="text-2xl font-bold">НОВЫЙ РЕКОРД!</span>
            </div>
          )}
        </div>

        <button
          onClick={onRestart}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-105 flex items-center gap-3 mx-auto"
        >
          <RefreshCw className="w-6 h-6" />
          Играть снова
        </button>
      </div>
    </div>
  );
}