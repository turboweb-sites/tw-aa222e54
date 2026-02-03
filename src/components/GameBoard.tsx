import { Position } from '../types/game'

interface GameBoardProps {
  snake: Position[]
  food: Position
  gridSize: number
}

export default function GameBoard({ snake, food, gridSize }: GameBoardProps) {
  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0].x === x && snake[0].y === y
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y)
    const isFood = food.x === x && food.y === y

    let cellClass = 'game-cell'
    
    if (isSnakeHead) {
      cellClass += ' bg-green-400 shadow-lg shadow-green-400/50'
    } else if (isSnakeBody) {
      cellClass += ' snake-cell'
    } else if (isFood) {
      cellClass += ' food-cell animate-pulse'
    }

    return (
      <div
        key={`${x}-${y}`}
        className={cellClass}
      />
    )
  }

  return (
    <div className="inline-block bg-gray-900 p-4 rounded-lg">
      <div 
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: `${gridSize * 20}px`,
          height: `${gridSize * 20}px`
        }}
      >
        {Array.from({ length: gridSize }, (_, y) =>
          Array.from({ length: gridSize }, (_, x) => renderCell(x, y))
        )}
      </div>
    </div>
  )
}