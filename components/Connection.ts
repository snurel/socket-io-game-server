import { Socket } from 'socket.io';
import { User } from './User';
import { IConnectionDetails } from './IConnectionDetails';

export class Connection {
  private readonly socket: Socket;
  private readonly id: string;

  private user: User | undefined;

  private details?: IConnectionDetails;

  constructor(socket: Socket) {
    this.socket = socket;
    this.id = socket.id.toString();
  }

  setDetails<T extends IConnectionDetails>(details: T): void {
    this.details = details;
  }

  getDetails<T extends IConnectionDetails>(): T {
    return this.details as T;
  }

  getId(): string {
    return this.id;
  }

  getSocket(): Socket {
    return this.socket;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUserName(): string | undefined {
    return this.user?.getName();
  }

  getUserId(): number | undefined {
    return this.user?.getId();
  }

  getUniqueKey(): string {
    return this.user?.getUniqueKey() ?? '';
  }
}
