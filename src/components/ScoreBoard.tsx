import { Trophy, Star } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

export default function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="flex justify-center gap-8 mb-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
          <Star size={20} />
          <span className="text-sm font-semibold uppercase">Score</span>
        </div>
        <div className="text-3xl font-bold">{score}</div>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-yellow-500 mb-1">
          <Trophy size={20} />
          <span className="text-sm font-semibold uppercase">Best</span>
        </div>
        <div className="text-3xl font-bold text-yellow-500">{highScore}</div>
      </div>
    </div>
  );
}