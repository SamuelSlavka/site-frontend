import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../event-bus';
import { SceneEnum } from '../enums/scene.enum';

export class MainMenu extends Scene {
  private title!: GameObjects.Text;
  private playButton!: GameObjects.Text;

  constructor() {
    super(SceneEnum.MainMenu);
  }

  create() {
    this.playButton = this.add
      .text(960, 540, 'play', {
        fontFamily: 'Droid Sans',
        fontSize: 24,
        color: '#ccccf0',
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
