# 🎮 Socket.IO Game Server

A modular, TypeScript-based Socket.IO game server framework, designed for managing real-time multiplayer games with a clean separation of concerns.

[![NPM Version](https://img.shields.io/npm/v/@your-scope/socketio-game-server.svg)](https://www.npmjs.com/package/@your-scope/socketio-game-server)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Build](https://img.shields.io/github/actions/workflow/status/your-org/socketio-game-server/ci.yml?branch=main)](https://github.com/your-org/socketio-game-server/actions)

---

## 📦 Installation

```bash
npm install socketio-game-server
```

---

## 🚀 Features

- 🔌 WebSocket connection management via Socket.IO
- 🧩 Message handling using the Command pattern
- 🎮 Game instance lifecycle management
- 🗂 Singleton-based global managers
- 🔧 Easily extensible for various game types

---

## 🧱 Architecture Overview

```
+----------------+        +-------------------+
|  Socket.IO     |<------>|  ConnectionManager|
+----------------+        +-------------------+
                             |
                             v
                     +------------------+
                     |   IOManager      |
                     +------------------+
                             |
                             v
                     +------------------+
                     |   GameManager    |
                     +------------------+
                             |
                             v
                   +----------------------+
                   |  Game / Player Logic |
                   +----------------------+
```

---

## 📡 ConnectionManager

Manages active connections and maps sockets to user IDs.

```ts
ConnectionManager.init(new MyConnectionManager());

export class MyConnectionManager extends ConnectionManager {
  initCommands() {
    .
    .
    .
    this.initCommand(SoloTestMessages.InitPlayer, new InitPlayerCommand());
    this.initCommand(SoloTestMessages.Disconnect, new DisconnectCommand());
    this.initCommand(SoloTestMessages.LobbyChat, new LobbyChatCommand());
    this.initCommand(SoloTestMessages.ChallengeUser, new ChallengeCommand());
    .
    .
    .
  }
}
```

- Auto-registers event listeners per socket
- Maps userId ↔ connectionId
- Dispatches messages to `BaseCommand` handlers

---

## 🎮 GameManager

Manages the lifecycle of game instances.

```ts
GameManager.init(new MyGameManager());
const game = GameManager.getInstance().create();
```

- Unique game ID generation
- Tracks all active games
- Supports custom game cleanup via `clearGame()`

---

## 🔄 IOManager

Initializes the HTTP + WebSocket server.

```ts
IOManager.init();
```

- Broadcast messages to rooms:

```ts
IOManager.instance.broadcastToGame(gameId, Messages.UPDATE, payload);
```

---

## 🧩 BaseCommand

Extendable class to encapsulate message handling logic.

```ts
class JoinGameCommand extends BaseCommand<MyGameManager, MyConnectionManager> {
  handle(socket, conn, msg) {
    const game = this.gameManager.getGame(msg.gameId);
    // game logic...
  }
}
```

- Receives `socket`, `Connection`, and message
- Access to all managers

---

## 📄 Example Project Structure

```
src/
├── base/
│   └── BaseCommand.ts
├── components/
│   ├── Connection.ts
│   └── Game.ts
├── managers/
│   ├── ConnectionManager.ts
│   ├── GameManager.ts
│   └── IOManager.ts
└── utility/
    └── IdGenerator.ts
```

---

## 🛠 Extending for Your Game

1. Subclass `GameManager`, `ConnectionManager`
2. Implement your `Game`, `Player`, `Command`s
3. Register commands via `initCommands()`
4. Run server using `IOManager.init()`

---

## 📜 License

Samet Nurel
