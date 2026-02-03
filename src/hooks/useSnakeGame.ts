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
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
    gameOver: false,
    isPaused: false
  });

  const gameLoopRef = useRef<number | null>(null);
  const directionRef = useRef<Direction>(gameState.direction);

  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const checkCollision = useCallback((head: Position, snake: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }

    return false;
  }, []);

  const moveSnake = useCallback(() => {
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

      if (checkCollision(head, newSnake)) {
        const newHighScore = Math.max(prevState.score, prevState.highScore);
        localStorage.setItem('snakeHighScore', newHighScore.toString());
        return { ...prevState, gameOver: true, highScore: newHighScore };
      }

      newSnake.unshift(head);

      let newScore = prevState.score;
      let newFood = prevState.food;

      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        newScore += 10;
        newFood = generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        direction: directionRef.current
      };
    });
  }, [checkCollision, generateFood]);

  const changeDirection = useCallback((newDirection: string) => {
    const opposites: Record<string, string> = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };

    if (opposites[newDirection] !== directionRef.current) {
      directionRef.current = newDirection as Direction;
    }
  }, []);

  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    directionRef.current = 'RIGHT';
    setGameState({
      snake: initialSnake,
      food: generateFood(initialSnake),
      direction: 'RIGHT',
      score: 0,
      highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
      gameOver: false,
      isPaused: false
    });
  }, [generateFood]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: false }));
  }, []);

  useEffect(() => {
    const speed = INITIAL_SPEED - Math.floor(gameState.score / 50) * SPEED_INCREMENT;
    
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    gameLoopRef.current = window.setInterval(moveSnake, Math.max(speed, 50));

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [moveSnake, gameState.score]);

  return {
    snake: gameState.snake,
    food: gameState.food,
    score: gameState.score,
    highScore: gameState.highScore,
    gameOver: gameState.gameOver,
    direction: gameState.direction,
    isPaused: gameState.isPaused,
    startGame,
    pauseGame,
    resumeGame,
    changeDirection
  };
}