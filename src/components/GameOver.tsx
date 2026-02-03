import { Trophy, RotateCcw } from 'lucide-react';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export default function GameOver({ score, highScore, onRestart }: GameOverProps) {
  const isNewHighScore = score === highScore && score > 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Игра окончена!</h2>
        
        {isNewHighScore && (
          <div className="mb-6 text-yellow-400">
            <Trophy className="h-16 w-16 mx-auto mb-2" />
            <p className="text-2xl font-semibold">Новый рекорд!</p>
          </div>
        )}

        <div className="space-y-2 mb-8">
          <p className="text-3xl font-bold text-white">Счёт: {score}</p>
          <p className="text-lg text-white/70">Рекорд: {highScore}</p>
        </div>

        <button
          onClick={onRestart}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg flex items-center gap-2 mx-auto transition-all hover:scale-105"
        >
          <RotateCcw className="h-5 w-5" />
          Играть снова
        </button>
      </div>
    </div>
  );
}