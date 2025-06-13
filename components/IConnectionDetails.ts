import { ClientType } from '../enums/ClientType';
import { Player } from './Player';
import { User } from './User';

export interface IConnectionDetails {
  type: ClientType;
  player?: Player;
  initPlayer(player: Player): void;
}
