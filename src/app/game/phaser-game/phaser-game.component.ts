import { Component, OnDestroy, OnInit } from '@angular/core';
import Phaser from 'phaser';
import StartGame from './main';
import { EventBus } from './event-bus';
import { Router } from '@angular/router';
import { SceneEnum } from './enums/scene.enum';
import { Game } from './scenes/game';

@Component({
  selector: 'phaser-game',
  template: '<div id="game-container"></div>',
  standalone: true,
})
export class PhaserGame implements OnInit, OnDestroy {
  private game?: Phaser.Game;
  private sceneCallback: ((scene: Phaser.Scene) => void) | undefined;
  private socket!: WebSocket;

  public scene?: Phaser.Scene;

  constructor(private router: Router) {}

  ngOnInit() {
    this.game = StartGame('game-container');

    EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
      this.scene = scene;

      if (this.sceneCallback) {
        this.sceneCallback(scene);
      }

      if (this.scene.scene?.key === SceneEnum.Game) {
        this.socket = (scene as Game).state.socket;
      }
    });

    EventBus.on('exit-clicked', () => {
      this.socket.close();
      this.router.navigate(['']);
    });
  }

  ngOnDestroy() {
    this.socket.close();
    this.game?.destroy(true);
  }
}
