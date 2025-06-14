import { GameOverParams } from '../enums/GameOverParams';
import { GameStatus } from '../enums/GameStatus';

export abstract class Game {
  protected id: number;
  protected gameState: GameStatus;

  constructor(id: number) {
    this.id = id;
    this.gameState = 'NOT_STARTED';
  }

  getId(): number {
    return this.id;
  }

  isStarted(): boolean {
    return this.gameState === 'STARTED';
  }

  gameOver(params: GameOverParams) {
    this.gameState = 'OVER';
  }

  getState(): GameStatus {
    return this.gameState;
  }

  abstract killGame(): void;

  abstract startGame(): void;
}
