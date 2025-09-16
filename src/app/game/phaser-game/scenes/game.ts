import { SceneEnum } from '../enums/scene.enum';
import { GameState } from '../state/game-state';
import { EventBus } from '../event-bus';
import { Scene } from 'phaser';
import { GameSocket } from '../utils/game-socket';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin';
import VirtualJoyStick from 'phaser3-rex-plugins/plugins/input/virtualjoystick/VirtualJoyStick';
import { handleJoystick, handleOtherPlayer, handleWasd } from '@app/game/phaser-game/services/movement-service';

export class Game extends Scene {
  public wasd!: any;
  public joystick!: VirtualJoyStick;
  public state!: GameState;
  private gameSocket!: GameSocket;
  private playersGroup!: Phaser.Physics.Arcade.Group;

  constructor() {
    super(SceneEnum.Game);
  }

  create() {
    this.state = new GameState();
    this.state.scene = this.scene;
    this.gameSocket = new GameSocket(this.state, this.addPlayer.bind(this));

    this.playersGroup = this.physics.add.group();
    this.physics.add.collider(this.playersGroup, this.playersGroup);

    const worldWidth = 4000;
    const worldHeight = 2000;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    this.physics.world.gravity.y = 0;

    // Create player
    this.state.player = this.addPlayerWithTint(2000, 1000, 0xa1a6f5);

    // Obstacles: red boxes
    const obstacles = this.physics.add.staticGroup();

    obstacles.create(2000, 700, '').setDisplaySize(120, 20).setTint(0x70a9a1).refreshBody();
    obstacles.create(2000, 1300, '').setDisplaySize(120, 20).setTint(0x70a9a1).refreshBody();
    obstacles.create(1700, 1000, '').setDisplaySize(20, 200).setTint(0x70a9a1).refreshBody();
    obstacles.create(2300, 1000, '').setDisplaySize(20, 200).setTint(0x70a9a1).refreshBody();
    obstacles.create(2000, 200, '').setDisplaySize(worldWidth, 10).setVisible(false).refreshBody();
    obstacles.create(2000, 1800, '').setDisplaySize(worldWidth, 10).setVisible(false).refreshBody();
    obstacles.create(1000, 1000, '').setDisplaySize(10, worldHeight).setVisible(false).refreshBody();
    obstacles.create(3000, 1000, '').setDisplaySize(10, worldHeight).setVisible(false).refreshBody();

    // Border using graphics
    const border = this.add.graphics();
    border.lineStyle(4, 0xffff00); // Yellow border, 4px thick
    border.strokeRect(1000, 200, 2000, 1600);

    // Ensure border stays in world space (not fixed to camera)
    border.setScrollFactor(1);

    // Collision
    this.physics.add.collider(this.state.player, obstacles, this.handleGameOver, undefined, this);

    // WASD keys
    this.wasd = this.input.keyboard?.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
    });
    let cameraOffset = -100;

    this.state.ping = this.add
      .text(this.cameras.main.width - 20, 20, 'ping', {
        fontFamily: 'Droid Sans',
        fontSize: 10,
        color: '#ccccf0',
      })
      .setOrigin(1, 0)
      .setScrollFactor(0);

    // joystick
    if (this.sys.game.device.input.touch) {
      this.joystick = (this.plugins.get('rexVirtualJoystick') as VirtualJoyStickPlugin).add(this, {
        x: this.cameras.main.width / 2,
        y: this.cameras.main.height * 0.8,
        radius: 60,
        base: this.add.circle(0, 0, 60, 0x888888),
        thumb: this.add.circle(0, 0, 30, 0xcccccc),
        dir: '8dir', // or '360'
        forceMin: 16,
        enable: true,
        fixed: true,
      });

      this.joystick.setScrollFactor(0);
      cameraOffset = -this.cameras.main.height * 0.18;
    }

    // Camera follow player
    this.cameras.main.startFollow(this.state.player, true, 1, 1, 0, cameraOffset);
    this.cameras.main.setBounds(200, 0, 3600, 2000);
    EventBus.emit('current-scene-ready', this);
  }

  override update(): void {
    const speed = 400;
    const body = this.state.player.body as Phaser.Physics.Arcade.Body;

    if (body) {
      // controls
      if (this.joystick && this.joystick.force > 0) {
        handleJoystick(speed, this.joystick, body);
      } else {
        handleWasd(speed, body, this.wasd);
      }
      this.sendPlayerMovement(this.state.player.x, this.state.player.y);

      // other players
      this.state.otherPlayers.forEach((player: Phaser.GameObjects.Sprite, key: string) => {
        const target = this.state.otherPlayerTargets.get(key);
        if (target) {
          handleOtherPlayer(player, target);
        }
      });
    }
  }

  private handleGameOver = () => {
    // Inform server (optional)
    this.state.socket.send(JSON.stringify({ type: 'player-dead', id: this.state.sessionId }));
    // Destroy player sprite
    this.state.player.destroy();
    this.state.socket.close();
    this.gameSocket.socketOpen = false;
    // Clear session ID
    this.state.scene.start(SceneEnum.GameOver);
  };

  private sendPlayerMovement(x: number, y: number) {
    if (this.state.socket.OPEN && this.gameSocket.socketOpen) {
      this.state.socket.send(JSON.stringify({ type: 'player-move', x, y, id: this.state.sessionId }));
    }
  }

  public addPlayer(x: number, y: number): Phaser.Physics.Arcade.Sprite {
    return this.addPlayerWithTint(x, y, 0xe63946);
  }

  public addPlayerWithTint(x: number, y: number, tint: number): Phaser.Physics.Arcade.Sprite {
    const player = this.physics.add
      .sprite(x, y, '')
      .setMass(5)
      .setDisplaySize(32, 32)
      .setTintFill(tint)
      .setBounce(0)
      .setDrag(1)
      .setCollideWorldBounds(true);
    this.playersGroup.add(player);
    return player;
  }
}
