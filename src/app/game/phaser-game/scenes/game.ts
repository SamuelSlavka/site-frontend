import { SceneEnum } from '../enums/scene.enum';
import { EventBus } from '../event-bus';
import { Scene } from 'phaser';

export class Game extends Scene {
  private camera!: Phaser.Cameras.Scene2D.Camera;
  private player!: Phaser.Physics.Arcade.Sprite;
  private wasd!: any;
  private obstacles!: Phaser.Physics.Arcade.StaticGroup;
  constructor() {
    super(SceneEnum.Game);
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x1c1b22);
    const worldWidth = 2000;
    const worldHeight = 2000;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    this.physics.world.gravity.y = 0;

    // Create player
    this.player = this.physics.add
      .sprite(200, 200, '')
      .setDisplaySize(32, 32)
      .setTint(0x00ff00)
      .setBounce(0.1)
      .setCollideWorldBounds(true);

    // Obstacles: red boxes
    this.obstacles = this.physics.add.staticGroup();

    this.obstacles.create(200, 150, '').setDisplaySize(40, 40).setTint(0xff0000).refreshBody();
    this.obstacles.create(400, 300, '').setDisplaySize(60, 60).setTint(0xff0000).refreshBody();

    // Collision
    this.physics.add.collider(this.player, this.obstacles, this.handleGameOver, undefined, this);

    // WASD keys
    this.wasd = this.input.keyboard?.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
    });

    // Camera follow player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    EventBus.emit('current-scene-ready', this);
  }

  override update(): void {
    const speed = 350;
    const body = this.player.body as Phaser.Physics.Arcade.Body;

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

    body.velocity.normalize().scale(speed); // ensure consistent speed diagonally
  }

  private handleGameOver = () => {
    this.scene.start('GameOver');
  };

  changeScene() {
    this.scene.start('GameOver');
  }
}
