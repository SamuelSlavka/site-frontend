export class GameState {
  public player!: Phaser.Physics.Arcade.Sprite;
  public otherPlayers: { [id: string]: Phaser.GameObjects.Sprite } = {};
  public sessionId!: String;
  public socket!: WebSocket;
}
