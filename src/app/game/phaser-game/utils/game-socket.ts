import { environment } from 'src/environments/environment';
import { EventBus } from '../event-bus';
import { GameState } from '../state/game-state';
import { SceneEnum } from '@app/game/phaser-game/enums/scene.enum';

export class GameSocket {
  public socketOpen = false;

  constructor(state: GameState, addPlayer: (x: number, y: number) => Phaser.Physics.Arcade.Sprite) {
    this.setupSocket(state, addPlayer);
  }

  private setupSocket(state: GameState, addPlayer: (x: number, y: number) => Phaser.Physics.Arcade.Sprite) {
    state.socket = new WebSocket(environment.wsUrl);
    const socket = state.socket;

    let pingInterval = 5000; // every 5 seconds
    let lastPingTime = 0;

    socket.onopen = () => {
      console.log('Connected to game server');
      this.socketOpen = true;
      socket.send(JSON.stringify({ type: 'player-start', id: state.sessionId }));
      socket.send(JSON.stringify({ type: 'request-existing-players' }));
      EventBus.emit('current-scene-ready', this);

      // Start pinging the server
      setInterval(() => {
        lastPingTime = Date.now();
        socket.send(JSON.stringify({ type: 'ping', timestamp: lastPingTime }));
      }, pingInterval);
    };

    socket.onclose = () => {
      console.log('closed');
      if (state.player && state.player.active) {
        state.player.destroy();
      }
      state.sessionId = '';
      state.scene.start(SceneEnum.GameOver);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'player-update':
          if (data.id != state.sessionId) this.updateOtherPlayer(state, data.id, data.x, data.y, addPlayer);
          break;
        case 'player-disconnected':
          state.otherPlayers.get(data.id)?.destroy();
          state.otherPlayers.delete(data.id);
          break;
        case 'player-connected':
          state.sessionId = data.id;
          break;
        case 'player-dead':
          if (state.otherPlayers.get(data.id) && data.id != state.sessionId) {
            console.log('player-dead');
            state.otherPlayers.get(data.id)?.destroy();
            state.otherPlayers.delete(data.id);
          }
          break;
        case 'existing-players':
          data.players.forEach((player: any) => {
            if (player.sessionId !== state.sessionId) {
              this.updateOtherPlayer(state, player.sessionId, player.x, player.y, addPlayer);
            }
          });
          break;
        case 'pong':
          const now = Date.now();
          const ping = now - data.timestamp;
          state.ping.setText(ping.toString());
          break;
      }
    };
  }

  private updateOtherPlayer(
    state: GameState,
    id: string,
    x: number,
    y: number,
    addPlayer: (x: number, y: number) => Phaser.Physics.Arcade.Sprite,
  ) {
    if (state.otherPlayers.get(id) && !state.otherPlayers.get(id)?.active) {
      state.otherPlayers.get(id)?.destroy();
      state.otherPlayers.delete(id);
    }

    if (!state.otherPlayers.get(id)) {
      state.otherPlayers.set(id, addPlayer(x, y));
    } else {
      state.otherPlayerTargets.set(id, { x, y });
    }
  }
}
