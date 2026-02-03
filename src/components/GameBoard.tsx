import { Position } from '../types/game';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gameOver: boolean;
  isPaused: boolean;
}

export default function GameBoard({ snake, food, gameOver, isPaused }: GameBoardProps) {
  const BOARD_SIZE = 20;
  const CELL_SIZE = 20;
  
  const isSnakeCell = (row: number, col: number) => {
    return snake.some(segment => segment.x === col && segment.y === row);
  };
  
  const isSnakeHead = (row: number, col: number) => {
    return snake.length > 0 && snake[0].x === col && snake[0].y === row;
  };
  
  const isFoodCell = (row: number, col: number) => {
    return food.x === col && food.y === row;
  };

  return (
    <div className="relative flex justify-center">
      <div 
        className="grid gap-0 bg-gray-900 p-4 rounded-lg border-4 border-gray-700"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: BOARD_SIZE }, (_, row) =>
          Array.from({ length: BOARD_SIZE }, (_, col) => {
            const isSnake = isSnakeCell(row, col);
            const isHead = isSnakeHead(row, col);
            const isFood = isFoodCell(row, col);
            
            return (
              <div
                key={`${row}-${col}`}
                className={`
                  transition-all duration-100
                  ${isHead ? 'bg-green-400 rounded-sm' : ''}
                  ${isSnake && !isHead ? 'bg-green-500' : ''}
                  ${isFood ? 'bg-red-500 rounded-full animate-pulse' : ''}
                  ${!isSnake && !isFood ? 'bg-gray-800' : ''}
                `}
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                }}
              />
            );
          })
        )}
      </div>
      
      {(gameOver || isPaused) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">
              {gameOver ? 'Game Over!' : 'Paused'}
            </h2>
            {gameOver && (
              <p className="text-xl text-gray-300">Press "Play Again" to restart</p>
            )}
            {isPaused && (
              <p className="text-xl text-gray-300">Press Space to resume</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}