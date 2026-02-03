import { Trophy, Pause, Play, RotateCcw } from 'lucide-react'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'
import { useSnakeGame } from '../hooks/useSnakeGame'

export default function Game() {
  const { gameState, startGame, togglePause, gridSize } = useSnakeGame()

  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">🐍 Змейка</h1>
        <p className="text-gray-400">Используйте стрелки или WASD для управления</p>
      </div>

      <ScoreBoard score={gameState.score} highScore={gameState.highScore} />

      <div className="relative">
        <GameBoard 
          snake={gameState.snake}
          food={gameState.food}
          gridSize={gridSize}
        />

        {/* Game Over Overlay */}
        {gameState.gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Игра окончена!</h2>
              <p className="text-xl mb-6">Счёт: {gameState.score}</p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Играть снова
              </button>
            </div>
          </div>
        )}

        {/* Start Game Overlay */}
        {!gameState.isPlaying && !gameState.gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Готовы играть?</h2>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xl font-semibold animate-pulse-slow"
              >
                Начать игру
              </button>
              <p className="mt-4 text-gray-400">Нажмите пробел для старта</p>
            </div>
          </div>
        )}

        {/* Pause Overlay */}
        {gameState.isPaused && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Pause className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-6">Пауза</h2>
              <button
                onClick={togglePause}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <Play className="w-5 h-5" />
                Продолжить
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {gameState.isPlaying && (
          <button
            onClick={togglePause}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            {gameState.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {gameState.isPaused ? 'Продолжить' : 'Пауза'}
          </button>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        <p>Скорость увеличивается с каждой съеденной едой!</p>
      </div>
    </div>
  )
}