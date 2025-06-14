import { Socket } from 'socket.io';
import { Connection } from '../components/Connection';
import Logger from '../utility/Logger';
import { BaseCommand } from '../base/BaseCommand';
import { Messages } from '../base/Messages';

export abstract class ConnectionManager {
  private connections: Map<string, Connection>;
  private connectionUserMap: Map<number, string>;

  private static instance: ConnectionManager;
  protected commands: Map<Messages, BaseCommand<any, any>>;

  static init(manager: ConnectionManager) {
    if (!this.instance) {
      this.instance = manager;
    }

    this.instance.initCommands();
  }

  static getInstance<T extends ConnectionManager>() {
    return this.instance as T;
  }

  constructor() {
    this.connections = new Map();
    this.connectionUserMap = new Map();
    this.commands = new Map();
  }

  abstract initCommands(): void;

  public getInactiveConnections(ids: number[]) {
    ids.forEach((userId) => {
      const con = this.getConnectionByUserId(userId);
      if (con) {
        Logger.info(
          `${userId} ready state: ${con.getSocket().conn._readyState}`
        );
      }
    });
  }

  protected initCommand(msg: Messages, cmd: BaseCommand<any, any>) {
    this.commands.set(msg, cmd);
  }

  public mapWithUserId(userId: number, connectionId: string) {
    this.connectionUserMap.set(userId, connectionId);
  }

  public getConnection(conId: string): Connection | undefined {
    return this.connections.get(conId);
  }

  public getConnectionByUserId(userId: number): Connection | undefined {
    const conId = this.connectionUserMap.get(userId);
    if (!conId) {
      return undefined;
    }

    return this.getConnection(conId);
  }

  public getConnectionIdByUserId(userId: number): string | undefined {
    return this.connectionUserMap.get(userId);
  }

  public clearUserIdFromMap(userId: number) {
    this.connectionUserMap.delete(userId);
  }

  public clearUser(userId: number) {
    const conId = this.getConnectionIdByUserId(userId);
    if (conId) {
      this.connections.delete(conId);
    }

    this.clearUserIdFromMap(userId);
  }

  private addListeners(socket: Socket): void {
    [...this.commands.keys()].forEach((cmd) => {
      this.handleMessage(cmd, socket);
    });
  }

  handleMessage = (event: Messages, socket: Socket, isOnce?: boolean) => {
    const listener = (message: any) => {
      const conn = this.connections.get(socket.id);

      const handler = this.commands.get(event);
      if (handler) {
        handler.handle(socket, conn, message);
      } else {
        Logger.warn(`Handler NOT FOUND for eventŞ '${event}'`);
      }
    };

    if (isOnce) {
      socket.once(event as string, listener);
    } else {
      socket.on(event as string, listener);
    }
  };

  addConnection(conn: Connection) {
    const exist = this.connections.has(conn.getId());
    if (!exist) {
      this.connections.set(conn.getId(), conn);
    }

    this.addListeners(conn.getSocket());
  }

  getPrevoiuslyConnectedUserId(
    uniqueKey: string,
    socket: Socket
  ): number | undefined {
    const conn = this.findConnectionByKey(uniqueKey);

    if (conn) {
      if (conn.getSocket().id !== socket.id) {
        conn.getSocket().disconnect();
      }

      const userId = conn.getUserId();
      if (userId) {
        this.connectionUserMap.delete(userId);
      }

      this.connections.delete(conn.getId());

      return userId;
    }

    return undefined;
  }

  findConnectionByKey(uniqueKey: string): Connection | undefined {
    for (const conn of this.connections.values()) {
      if (conn.getUniqueKey() === uniqueKey) {
        return conn;
      }
    }
    return undefined;
  }
}
