// MatterStepOne.js
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { ColorScheme } from '../../enums/ColorScheme';
import { Link } from 'react-router-dom';
import { addListeners, handleControl, handleKeypress } from './utils/input_handling';
import { handleResize } from './utils/resize_handling';
import { Categories, Constants } from './enums/gameConstants';
import { getBody } from './utils/matterjs_utils';
import { body_config, player_config } from './utils/body_utils';

var keyMap: { [id: string]: any } = {};

const GamePage = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [constraints, setConstraints] = useState<DOMRect>();
  const [scene, setScene] = useState<any>();

  // Matter setup
  useEffect(() => {
    const bounds = boxRef?.current?.getBoundingClientRect();
    setConstraints(bounds);
    addListeners(keyMap);
    const Bodies = Matter.Bodies;
    const Constraint = Matter.Constraint;
    const MouseConstraint = Matter.MouseConstraint;
    const Runner = Matter.Runner;
    const Render = Matter.Render;
    const Mouse = Matter.Mouse;
    const Composite = Matter.Composite;

    const engine = Matter.Engine.create({});
    const world = engine.world;

    const render = Matter.Render.create({
      element: boxRef.current ?? undefined,
      engine: engine,
      canvas: canvasRef.current ?? undefined,
      options: {
        background: ColorScheme.black,
        wireframes: false
      }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    const floor = Bodies.rectangle(0, 0, 0, 200, body_config('floor'));
    const ceiling = Bodies.rectangle(0, 0, 0, 200, body_config('ceiling'));
    const leftWall = Bodies.rectangle(0, 0, 0, 200, body_config('leftWall'));
    const rightWall = Bodies.rectangle(0, 0, 0, 200, body_config('rightWall'));

    const boundX = ((bounds?.width ?? 200) / 2);
    const boundY = ((bounds?.height ?? 200) / 1.2);
    var control = Bodies.polygon(boundX, boundY, 8, 20, {
      density: 0.004,
      label: 'control',
      collisionFilter: {
        mask: Categories.DRAGGABLE,
      },
    });
    const anchor = { x: boundX, y: boundY };
    const elastic = Constraint.create({
      label: 'control',
      pointA: anchor,
      bodyB: control,
      stiffness: 0.08,
      render: {
        lineWidth: 0
      }
    });

    const ball = Bodies.circle(100, -Constants.PARTICLE_SIZE, Constants.PARTICLE_SIZE, player_config('player'));

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      collisionFilter: {
        mask: Categories.DRAGGABLE
      },
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    const controlComposite = Composite.create({ label: 'controls' });
    Composite.add(controlComposite, [control, elastic, mouseConstraint])
    const elementsComposite = Composite.create({ label: 'elements' });
    Composite.add(elementsComposite, [floor, ceiling, leftWall, rightWall, ball])
    Composite.add(world, [elementsComposite, controlComposite]);
    Matter.Render.run(render);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // main game loop
    Matter.Events.on(runner, 'afterTick', function (event) {
      const player = getBody(world.composites, 'elements', 'player');
      if (player) {
        const controlRes = handleControl(world.composites)
        const { x, y } = handleKeypress(keyMap, player);

        const bounds = boxRef?.current?.getBoundingClientRect();
        if (bounds) {
          if (player.position.x > bounds.width || player.position.x < 0 ||
            player.position.y > bounds.height || player.position.y < 0) {
            Matter.Body.setPosition(player, { x: 100, y: 100 })
          }
        }
        Matter.Body.setVelocity(player, { x: Math.min((x + controlRes.x), 60), y: Math.min((y + controlRes.y), 60) });
      }
    })

    // collision handling
    // Matter.Events.on(engine, 'collisionStart', function (event) {
    //   var pairs = event.pairs;

    //   for (var i = 0, j = pairs.length; i != j; ++i) {
    //       var pair = pairs[i];
    //       if(pair.bodyA.label === 'player' || pair.bodyB.label === 'player')  {

    //       }
    //   }
    // });

    setScene(render);
  }, []);
    

  const addBall = () => {
    if (constraints && scene) {
      let { width } = constraints;
      let randomX = Math.floor(Math.random() * -width) + width;
      Matter.World.add(
        scene.engine.world,
        Matter.Bodies.circle(randomX, -Constants.PARTICLE_SIZE, Constants.PARTICLE_SIZE, {
          restitution: Constants.PARTICLE_BOUNCYNESS,
          collisionFilter: {
            category: Categories.STATIC
          },
          render: {
            fillStyle: ColorScheme.light
          }
        })
      );
    }
  }

  // initial setup
  useEffect(() => {
    window.onresize = () => {
      const bounds = boxRef?.current?.getBoundingClientRect();
      setConstraints(bounds);
    }
  }, []);

  // update floor controller and scene size on resize
  useEffect(() => {
    if (constraints && scene) {
      // Update floor and scene size
      handleResize(scene, constraints);
    }
  }, [scene, constraints]);

  return (
    <div
      data-testid="GamePage"
      ref={boxRef}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <section className="LinkTopContainer">
        <Link to="/" className='LinkTop'>
          <span>{"< home"}</span>
        </Link>
      </section>
      <section className='LinkTopContainer AlignLeft' >
        <button onClick={() => addBall()} className='LinkTop'>
          <span>{"add a ball"}</span>
        </button>
      </section>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default GamePage;