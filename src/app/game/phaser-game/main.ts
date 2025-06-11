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
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
