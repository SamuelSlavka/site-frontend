import { SceneEnum } from '../enums/scene.enum';
import { GameState } from '../state/game-state';
import { EventBus } from '../event-bus';
import { Scene } from 'phaser';
import { GameSocket } from '../utils/game-socket';

export class Game extends Scene {
  public wasd!: any;
  public state!: GameState;
  private gameSocket!: GameSocket;

  constructor() {
    super(SceneEnum.Game);
  }

  create() {
    this.state = new GameState();
    this.gameSocket = new GameSocket(this.state, this.addPlayer.bind(this));

    const worldWidth = 4000;
    const worldHeight = 2000;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    this.physics.world.gravity.y = 0;

    // Create player
    this.state.player = this.addPlayer(2000, 1000);

    // Obstacles: red boxes
    const obstacles = this.physics.add.staticGroup();

    obstacles.create(2000, 700, '').setDisplaySize(40, 40).setTint(0xff0000).refreshBody();
    obstacles.create(1700, 1000, '').setDisplaySize(60, 60).setTint(0xff0000).refreshBody();
    obstacles.create(2000, 200, '').setDisplaySize(worldWidth, 10).setVisible(false).refreshBody();
    obstacles.create(2000, 1800, '').setDisplaySize(worldWidth, 10).setVisible(false).refreshBody();
    obstacles.create(1000, 1000, '').setDisplaySize(10, worldHeight).setVisible(false).refreshBody();
    obstacles.create(3000, 1000, '').setDisplaySize(10, worldHeight).setVisible(false).refreshBody();

    // Border using graphics
    const border = this.add.graphics();
    border.lineStyle(4, 0xffff00); // Yellow border, 4px thick
    border.strokeRect(1000, 200, 2000, 1600);

    // Ensure border stays in world space (not fixed to camera)
    border.setScrollFactor(1);

    // Collision
    this.physics.add.collider(this.state.player, obstacles, this.handleGameOver, undefined, this);

    // WASD keys
    this.wasd = this.input.keyboard?.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
    });

    // Camera follow player
    this.cameras.main.startFollow(this.state.player);
    this.cameras.main.setBounds(200, 0, 3600, 2000);
    EventBus.emit('current-scene-ready', this);
  }

  override update(): void {
    const speed = 500;
    const body = this.state.player.body as Phaser.Physics.Arcade.Body;
    if (body) {
      body.setVelocity(0);

      if (this.wasd.left.isDown) {
        body.setVelocityX(-speed);
      } else if (this.wasd.right.isDown) {
        body.setVelocityX(speed);
      }

      if (this.wasd.up.isDown) {
        body.setVelocityY(-speed);
      } else if (this.wasd.down.isDown) {
        body.setVelocityY(speed);
      }

      body.velocity.normalize().scale(speed);
      this.sendPlayerMovement(this.state.player.x, this.state.player.y);

      this.state.otherPlayers.forEach((player: Phaser.GameObjects.Sprite, key: string) => {
        const target = this.state.otherPlayerTargets.get(key);
        if (target) {
          player.x = Phaser.Math.Linear(player.x, target.x, 0.1);
          player.y = Phaser.Math.Linear(player.y, target.y, 0.1);
        }
      });
    }
  }

  private handleGameOver = () => {
    // Inform server (optional)
    this.state.socket.send(JSON.stringify({ type: 'player-dead', id: this.state.sessionId }));
    // Destroy player sprite
    this.state.player.destroy();
    this.state.socket.close();
    this.gameSocket.socketOpen = false;
    // Clear session ID
    this.scene.start(SceneEnum.GameOver);
  };

  private sendPlayerMovement(x: number, y: number) {
    if (this.state.socket.OPEN && this.gameSocket.socketOpen) {
      this.state.socket.send(JSON.stringify({ type: 'player-move', x, y, id: this.state.sessionId }));
    }
  }

  public addPlayer(x: number, y: number): Phaser.Physics.Arcade.Sprite {
    return this.physics.add
      .sprite(x, y, '')
      .setDisplaySize(32, 32)
      .setTint(0x00ff00)
      .setBounce(0.1)
      .setCollideWorldBounds(true);
  }
}
