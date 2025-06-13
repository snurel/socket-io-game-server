import { ClientType } from '../enums/ClientType';
import { Player } from './Player';

export interface IConnectionDetails {
  type: ClientType;
  player?: Player;
  initPlayer(player: Player): void;
}
