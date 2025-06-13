import { Game } from '../components/Game';
import { IdGenerator } from '../utility/IdGenerator';

export abstract class GameManager {
  games: Map<number, Game>;

  private static instance: GameManager;
  static ID_COUNTER = 0;

  static init(manager: GameManager) {
    if (!this.instance) {
      this.instance = manager;
    }
  }

  static getInstance<T extends GameManager>() {
    return this.instance as T;
  }

  static generateId() {
    return ++GameManager.ID_COUNTER;
  }

  constructor() {
    this.games = new Map();
  }

  getGame(id: number): Game | undefined {
    return this.games.get(id);
  }

  create(): Game {
    const gameId = IdGenerator.get();
    const game = this.createGame(gameId);
    this.games.set(game.getId(), game);
    return game;
  }

  clear(gameId: number) {
    this.games.delete(gameId);
  }

  protected abstract createGame(id: number): Game;

  abstract clearGame(gameId: number): void;
}
