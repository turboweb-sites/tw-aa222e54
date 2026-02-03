export interface Position {
  x: number;
  y: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameState = 'idle' | 'playing' | 'paused' | 'gameover';