import { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import useSnakeGame from './hooks/useSnakeGame';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function App() {
  const { 
    snake, 
    food, 
    gameOver, 
    score, 
    highScore,
    isPaused,
    startGame, 
    pauseGame, 
    resumeGame,
    moveSnake 
  } = useSnakeGame();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameOver || isPaused) return;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        moveSnake('UP');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        moveSnake('DOWN');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        moveSnake('LEFT');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        moveSnake('RIGHT');
        break;
      case ' ':
        if (isPaused) resumeGame();
        else pauseGame();
        break;
    }
  }, [gameOver, isPaused, moveSnake, pauseGame, resumeGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Snake Game
        </h1>
        
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 mb-6">
          <ScoreBoard score={score} highScore={highScore} />
          
          <div className="flex justify-center gap-4 mb-6">
            {!gameOver && (
              <button
                onClick={isPaused ? resumeGame : pauseGame}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                {isPaused ? <Play size={20} /> : <Pause size={20} />}
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            )}
            
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              <RotateCcw size={20} />
              {gameOver ? 'Play Again' : 'New Game'}
            </button>
          </div>
          
          <GameBoard 
            snake={snake} 
            food={food} 
            gameOver={gameOver}
            isPaused={isPaused}
          />
        </div>
        
        <div className="text-center text-gray-400">
          <p className="mb-2">Use Arrow Keys or WASD to move</p>
          <p>Press Space to pause/resume</p>
        </div>
      </div>
    </div>
  );
}