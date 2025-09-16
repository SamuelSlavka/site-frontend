export class GameState {
  public player!: Phaser.Physics.Arcade.Sprite;
  public otherPlayers: Map<string, Phaser.GameObjects.Sprite> = new Map();
  public otherPlayerTargets: Map<string, { x: number; y: number }> = new Map();
  public sessionId!: String;
  public socket!: WebSocket;
  public scene!: Phaser.Scenes.ScenePlugin;
  public ping!: Phaser.GameObjects.Text;
}
