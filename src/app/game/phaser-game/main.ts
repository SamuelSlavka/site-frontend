import { Boot } from './scenes/boot';
import { GameOver } from './scenes/game-over';
import { Game as MainGame } from './scenes/game';
import { MainMenu } from './scenes/main-menu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/preloader';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  parent: 'game-container',
  backgroundColor: '#1c1b22',
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
