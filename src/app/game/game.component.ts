import { CommonModule } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import Phaser, { Scene } from 'phaser';
import { EventBus } from './phaser-game/event-bus';
import { PhaserGame } from './phaser-game/phaser-game.component';
import { MainMenu } from './phaser-game/scenes/main-menu';
import { RouterModule, Routes } from '@angular/router';
import { SceneEnum } from './phaser-game/enums/scene.enum';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PhaserGame],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  public spritePosition = { x: 0, y: 0 };
  public canMoveSprite = false;

  // New way to get the component instance
  phaserRef = viewChild.required(PhaserGame);

  constructor() {
    // You can now safely set up your EventBus subscriptions here
    EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
      this.canMoveSprite = scene.scene.key !== SceneEnum.MainMenu;
    });
  }

  public changeScene() {
    const scene = this.phaserRef().scene as MainMenu;
    if (scene) {
      scene.changeScene();
    }
  }

  public moveSprite() {
    const scene = this.phaserRef().scene as MainMenu;
    if (scene) {
      scene.moveLogo(({ x, y }) => {
        this.spritePosition = { x, y };
      });
    }
  }

  public addSprite() {
    const scene = this.phaserRef().scene;
    if (scene) {
      const x = Phaser.Math.Between(64, scene.scale.width - 64);
      const y = Phaser.Math.Between(64, scene.scale.height - 64);

      const star = scene.add.sprite(x, y, 'star');

      scene.add.tween({
        targets: star,
        duration: 500 + Math.random() * 1000,
        alpha: 0,
        yoyo: true,
        repeat: -1,
      });
    }
  }
}
