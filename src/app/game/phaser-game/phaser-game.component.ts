import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import Phaser from 'phaser';
import StartGame from './main';
import { EventBus } from './event-bus';

@Component({
  selector: 'phaser-game',
  template: '<div id="game-container"></div>',
  standalone: true,
})
export class PhaserGame implements OnInit, OnDestroy {
  scene?: Phaser.Scene;
  game?: Phaser.Game;
  sceneCallback: ((scene: Phaser.Scene) => void) | undefined;

  ngOnInit() {
    this.game = StartGame('game-container');

    EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
      this.scene = scene;

      if (this.sceneCallback) {
        this.sceneCallback(scene);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.game?.scale.resize(width, height);
  }

  ngOnDestroy() {
    this.game?.destroy(true);
  }
}
