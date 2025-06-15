import { SceneEnum } from '../enums/scene.enum';
import { EventBus } from '../event-bus';
import { GameObjects, Scene } from 'phaser';

export class GameOver extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;
  background!: Phaser.GameObjects.Image;
  gameOverText!: Phaser.GameObjects.Text;
  playButton!: GameObjects.Text;
  exitButton!: GameObjects.Text;

  constructor() {
    super(SceneEnum.GameOver);
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x1c1b22);

    this.playButton = this.add
      .text(960, 540 - 80, 'again', {
        fontFamily: 'Droid Sans',
        fontSize: 32,
        color: '#271b2c',
        align: 'center',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.changeScene())
      .on('pointerover', () => this.playButton!.setStyle({ color: '#a1a6f5' }))
      .on('pointerout', () => this.playButton!.setStyle({ color: '#ccccf0' }));

    this.exitButton = this.add
      .text(960, 540, 'exit', {
        fontFamily: 'Droid Sans',
        fontSize: 32,
        color: '#271b2c',
        align: 'center',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => EventBus.emit('exit-clicked', this))
      .on('pointerover', () => this.exitButton!.setStyle({ color: '#a1a6f5' }))
      .on('pointerout', () => this.exitButton!.setStyle({ color: '#ccccf0' }));

    EventBus.emit('current-scene-ready', this);
  }

  changeScene() {
    this.scene.start(SceneEnum.Game);
  }
}
