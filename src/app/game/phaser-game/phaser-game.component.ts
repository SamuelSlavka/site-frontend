import { Component, OnInit } from "@angular/core";
import Phaser from "phaser";
import StartGame from "./main";
import { EventBus } from "./event-bus";

@Component({
    selector: 'phaser-game',
    template: '<div id="game-container"></div>',
    standalone: true,
})
export class PhaserGame implements OnInit
{
    scene: Phaser.Scene | undefined;
    game: Phaser.Game | undefined;
    sceneCallback: ((scene: Phaser.Scene) => void) | undefined;

    ngOnInit ()
    {
        this.game = StartGame('game-container');

        EventBus.on('current-scene-ready', (scene: Phaser.Scene) =>
        {
            this.scene = scene;

            if (this.sceneCallback)
            {
                this.sceneCallback(scene);
            }
        });
    }

    ngOnDestroy ()
    {
        if (this.game)
        {
            this.game.destroy(true);
        }
    }
}
