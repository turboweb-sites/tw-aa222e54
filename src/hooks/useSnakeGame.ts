import { useState, useEffect, useCallback, useRef } from 'react'
import { Direction, Position, GameState } from '../types/game'

const GRID_SIZE = 20
const INITIAL_SPEED = 150
const SPEED_INCREMENT = 5
const POINTS_PER_FOOD = 10

const INITIAL_STATE: GameState = {
  snake: [{ x: 10, y: 10 }],
  food: { x: 15, y: 15 },
  direction: 'RIGHT',
  nextDirection: 'RIGHT',
  score: 0,
  highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
  isPlaying: false,
  isPaused: false,
  gameOver: false,
  speed: INITIAL_SPEED
}

export function useSnakeGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE)
  const gameLoopRef = useRef<number | null>(null)

  const generateRandomFood = useCallback((snake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const checkCollision = useCallback((head: Position, snake: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    // Self collision
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  }, [])

  const moveSnake = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.isPlaying || prevState.isPaused || prevState.gameOver) {
        return prevState
      }

      const { snake, food, direction, nextDirection, score, highScore, speed } = prevState
      const currentDirection = nextDirection || direction

      // Calculate new head position
      const head = { ...snake[0] }
      switch (currentDirection) {
        case 'UP':
          head.y -= 1
          break
        case 'DOWN':
          head.y += 1
          break
        case 'LEFT':
          head.x -= 1
          break
        case 'RIGHT':
          head.x += 1
          break
      }

      // Check collision
      if (checkCollision(head, snake)) {
        const newHighScore = Math.max(score, highScore)
        localStorage.setItem('snakeHighScore', newHighScore.toString())
        return {
          ...prevState,
          gameOver: true,
          isPlaying: false,
          highScore: newHighScore
        }
      }

      const newSnake = [head, ...snake]
      let newFood = food
      let newScore = score
      let newSpeed = speed

      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        newFood = generateRandomFood(newSnake)
        newScore += POINTS_PER_FOOD
        newSpeed = Math.max(50, speed - SPEED_INCREMENT)
      } else {
        newSnake.pop()
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        direction: currentDirection,
        score: newScore,
        speed: newSpeed
      }
    })
  }, [checkCollision, generateRandomFood])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const { direction, isPlaying, isPaused } = gameState

    if (e.key === ' ') {
      if (!isPlaying) {
        startGame()
      } else {
        togglePause()
      }
      return
    }

    if (!isPlaying || isPaused) return

    const keyToDirection: Record<string, Direction> = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT',
      w: 'UP',
      s: 'DOWN',
      a: 'LEFT',
      d: 'RIGHT'
    }

    const newDirection = keyToDirection[e.key]
    if (!newDirection) return

    // Prevent opposite direction
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT'
    }

    if (opposites[direction] !== newDirection) {
      setGameState(prev => ({ ...prev, nextDirection: newDirection }))
    }
  }, [gameState.direction, gameState.isPlaying, gameState.isPaused])

  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }]
    setGameState({
      ...INITIAL_STATE,
      snake: initialSnake,
      food: generateRandomFood(initialSnake),
      isPlaying: true,
      gameOver: false,
      highScore: gameState.highScore
    })
  }, [generateRandomFood, gameState.highScore])

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
  }, [])

  // Game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused) {
      gameLoopRef.current = window.setInterval(moveSnake, gameState.speed)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.isPaused, gameState.speed, moveSnake])

  // Keyboard controls
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return {
    gameState,
    startGame,
    togglePause,
    gridSize: GRID_SIZE
  }
}