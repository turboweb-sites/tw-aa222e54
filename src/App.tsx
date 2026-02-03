import { useState } from 'react';
import Game from './components/Game';
import GameOver from './components/GameOver';
import Score from './components/Score';
import { Trophy, Play } from 'lucide-react';
import useSnakeGame from './hooks/useSnakeGame';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const { 
    snake, 
    food, 
    score, 
    highScore,
    gameOver, 
    direction,
    isPaused,
    startGame, 
    pauseGame,
    resumeGame,
    changeDirection 
  } = useSnakeGame();

  const handleStart = () => {
    setGameStarted(true);
    startGame();
  };

  const handleRestart = () => {
    startGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            ЗМЕЙКА
          </h1>
          <p className="text-gray-400">Классическая игра</p>
        </div>

        {/* High Score */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-gray-800/50 px-6 py-3 rounded-full border border-gray-700">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-400">Рекорд:</span>
            <span className="text-xl font-bold text-yellow-500">{highScore}</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
          {!gameStarted ? (
            <div className="flex flex-col items-center justify-center h-[500px]">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Добро пожаловать в игру Змейка!</h2>
                  <p className="text-gray-400">Управляйте змейкой и собирайте еду</p>
                </div>
                
                <div className="space-y-3 text-gray-400">
                  <p>🎮 Управление: стрелки на клавиатуре</p>
                  <p>🍎 Собирайте красную еду</p>
                  <p>⚠️ Не врезайтесь в стены и в себя</p>
                  <p>⏸️ Пробел - пауза</p>
                </div>

                <button
                  onClick={handleStart}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <Play className="w-6 h-6" />
                  Начать игру
                </button>
              </div>
            </div>
          ) : (
            <>
              <Score score={score} isPaused={isPaused} />
              
              {gameOver ? (
                <GameOver 
                  score={score} 
                  highScore={highScore} 
                  onRestart={handleRestart} 
                />
              ) : (
                <Game 
                  snake={snake}
                  food={food}
                  onDirectionChange={changeDirection}
                  isPaused={isPaused}
                  onPause={pauseGame}
                  onResume={resumeGame}
                />
              )}
            </>
          )}
        </div>

        {/* Instructions */}
        {gameStarted && !gameOver && (
          <div className="mt-6 text-center text-gray-400">
            <p>Используйте стрелки ↑ ↓ ← → для управления • Пробел для паузы</p>
          </div>
        )}
      </div>
    </div>
  );
}