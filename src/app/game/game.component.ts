import { Component, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { PhaserGame } from './phaser-game/phaser-game.component';
import { MainMenu } from './phaser-game/scenes/main-menu';

@Component({
  selector: 'app-game',
  imports: [PhaserGame],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  phaserRef = viewChild.required(PhaserGame);

  public changeScene() {
    const scene = this.phaserRef().scene as MainMenu;
    if (scene) {
      scene.changeScene();
    }
  }
}
