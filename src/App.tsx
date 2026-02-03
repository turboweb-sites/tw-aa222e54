import { useState } from 'react';
import Game from './components/Game';
import Controls from './components/Controls';
import GameOver from './components/GameOver';
import useSnakeGame from './hooks/useSnakeGame';
import { Trophy, Gamepad2 } from 'lucide-react';

export default function App() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const { 
    snake, 
    food, 
    gameState, 
    score, 
    highScore, 
    direction,
    startGame, 
    pauseGame, 
    resumeGame, 
    changeDirection,
    gridSize 
  } = useSnakeGame(difficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Gamepad2 className="h-12 w-12" />
            Змейка
          </h1>
          <p className="text-purple-200">Классическая игра на реакцию</p>
        </div>

        {/* Score Board */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <p className="text-sm opacity-75">Счёт</p>
              <p className="text-3xl font-bold">{score}</p>
            </div>
            <div className="text-white text-right">
              <p className="text-sm opacity-75 flex items-center gap-1 justify-end">
                <Trophy className="h-4 w-4" /> Рекорд
              </p>
              <p className="text-3xl font-bold">{highScore}</p>
            </div>
          </div>
        </div>

        {/* Game Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <Game 
            snake={snake} 
            food={food} 
            gridSize={gridSize}
            gameState={gameState}
          />
        </div>

        {/* Controls */}
        <Controls
          gameState={gameState}
          onStart={startGame}
          onPause={pauseGame}
          onResume={resumeGame}
          onDirectionChange={changeDirection}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />

        {/* Game Over Modal */}
        {gameState === 'gameover' && (
          <GameOver
            score={score}
            highScore={highScore}
            onRestart={startGame}
          />
        )}
      </div>
    </div>
  );
}