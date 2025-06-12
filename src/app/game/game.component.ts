import { CommonModule } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { PhaserGame } from './phaser-game/phaser-game.component';
import { MainMenu } from './phaser-game/scenes/main-menu';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PhaserGame],
  templateUrl: './game.component.html',
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
