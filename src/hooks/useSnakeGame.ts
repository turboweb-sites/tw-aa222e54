import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, Direction, GameState } from '../types/game';

const BOARD_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;

export default function useSnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: 'RIGHT',
    gameOver: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
    isPaused: false,
  });

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<Direction>('RIGHT');

  const generateRandomFood = useCallback((snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const moveSnake = useCallback((newDirection: Direction) => {
    const opposites = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposites[newDirection] !== directionRef.current) {
      directionRef.current = newDirection;
    }
  }, []);

  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver || prevState.isPaused) return prevState;

      const newSnake = [...prevState.snake];
      const head = { ...newSnake[0] };

      switch (directionRef.current) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        const newHighScore = Math.max(prevState.score, prevState.highScore);
        localStorage.setItem('snakeHighScore', newHighScore.toString());
        return { ...prevState, gameOver: true, highScore: newHighScore };
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        const newHighScore = Math.max(prevState.score, prevState.highScore);
        localStorage.setItem('snakeHighScore', newHighScore.toString());
        return { ...prevState, gameOver: true, highScore: newHighScore };
      }

      newSnake.unshift(head);

      let newScore = prevState.score;
      let newFood = prevState.food;

      // Check food collision
      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        newScore += 10;
        newFood = generateRandomFood(newSnake);
      } else {
        newSnake.pop();
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        direction: directionRef.current,
      };
    });
  }, [generateRandomFood]);

  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    const initialFood = generateRandomFood(initialSnake);
    directionRef.current = 'RIGHT';
    
    setGameState(prevState => ({
      snake: initialSnake,
      food: initialFood,
      direction: 'RIGHT',
      gameOver: false,
      score: 0,
      highScore: prevState.highScore,
      isPaused: false,
    }));
  }, [generateRandomFood]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: false }));
  }, []);

  useEffect(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    const speed = INITIAL_SPEED - Math.floor(gameState.score / 50) * SPEED_INCREMENT;
    gameLoopRef.current = setInterval(updateGame, Math.max(50, speed));

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [updateGame, gameState.score]);

  return {
    snake: gameState.snake,
    food: gameState.food,
    gameOver: gameState.gameOver,
    score: gameState.score,
    highScore: gameState.highScore,
    isPaused: gameState.isPaused,
    startGame,
    pauseGame,
    resumeGame,
    moveSnake,
  };
}