import { Apple } from 'lucide-react';

interface ScoreProps {
  score: number;
  isPaused: boolean;
}

export default function Score({ score, isPaused }: ScoreProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <Apple className="w-6 h-6 text-red-500" />
        <span className="text-gray-400">Счёт:</span>
        <span className="text-3xl font-bold text-white">{score}</span>
      </div>
      
      {isPaused && (
        <div className="text-yellow-500 font-semibold animate-pulse">
          ПАУЗА
        </div>
      )}
    </div>
  );
}