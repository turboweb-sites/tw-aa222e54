import { Trophy, Star } from 'lucide-react'

interface ScoreBoardProps {
  score: number
  highScore: number
}

export default function ScoreBoard({ score, highScore }: ScoreBoardProps) {
  return (
    <div className="flex justify-between items-center mb-6 bg-gray-700 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Star className="w-6 h-6 text-yellow-500" />
        <div>
          <p className="text-sm text-gray-400">Счёт</p>
          <p className="text-2xl font-bold">{score}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <div>
          <p className="text-sm text-gray-400">Рекорд</p>
          <p className="text-2xl font-bold">{highScore}</p>
        </div>
      </div>
    </div>
  )
}