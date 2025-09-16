import VirtualJoyStick from 'phaser3-rex-plugins/plugins/input/virtualjoystick/VirtualJoyStick';

export const handleJoystick = (speed: number, joystick: VirtualJoyStick, body: Phaser.Physics.Arcade.Body) => {
  const rad = Phaser.Math.DegToRad(joystick.angle);
  const vx = Math.cos(rad) * speed;
  const vy = Math.sin(rad) * speed;
  body.setVelocity(vx, vy);
};

export const handleWasd = (speed: number, body: Phaser.Physics.Arcade.Body, wasd: any) => {
  body.setVelocity(0);

  if (wasd.left.isDown) {
    body.setVelocityX(-speed);
  } else if (wasd.right.isDown) {
    body.setVelocityX(speed);
  }

  if (wasd.up.isDown) {
    body.setVelocityY(-speed);
  } else if (wasd.down.isDown) {
    body.setVelocityY(speed);
  }

  body.velocity.normalize().scale(speed);
};

export const handleOtherPlayer = (player: Phaser.GameObjects.Sprite, target: { x: number, y: number }) => {
  const body = player.body as Phaser.Physics.Arcade.Body;
  if (!body) return;

  // Compute distance vector
  const dx = target.x - player.x;
  const dy = target.y - player.y;

  const dist = Math.hypot(dx, dy);
  if (dist < 6) {
    player.x = Phaser.Math.Linear(player.x, target.x, 0.1);
    player.y = Phaser.Math.Linear(player.y, target.y, 0.1);
    body.setVelocity(0, 0);
    return;
  }

  let speed;
  if (dist > 200) {
    speed = 800;
  } else if (dist > 80) {
    speed = 500;
  } else {
    speed = 300;
  }

  // Calculate velocity towards the target
  const angle = Math.atan2(dy, dx);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  // Set the velocity
  body.setVelocity(vx, vy);
};
