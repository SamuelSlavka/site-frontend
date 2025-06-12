import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../event-bus';
import { SceneEnum } from '../enums/scene.enum';

export class MainMenu extends Scene {
  private camera!: Phaser.Cameras.Scene2D.Camera;
  title?: GameObjects.Text;
  playButton?: GameObjects.Text;

  constructor() {
    super(SceneEnum.MainMenu);
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x1c1b22);

    this.playButton = this.add
      .text(window.innerWidth / 2, window.innerHeight / 2, 'Play Game', {
        fontFamily: 'Arial',
        fontSize: 32,
        color: '#ccccf0',
        stroke: '#a1a6f5',
        strokeThickness: 1,
        align: 'center',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.changeScene())
      .on('pointerover', () => this.playButton!.setStyle({ color: '#a1a6f5' }))
      .on('pointerout', () => this.playButton!.setStyle({ color: '#ccccf0' }));

    EventBus.emit('current-scene-ready', this);
  }

  changeScene() {
    this.scene.start('Game');
  }
}
