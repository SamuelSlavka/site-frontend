// MatterStepOne.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { ColorScheme } from '../../enums/ColorScheme';
import { Link } from 'react-router-dom';

const STATIC_DENSITY = 30;
const PARTICLE_SIZE = 10;
const PARTICLE_BOUNCYNESS = 0;

var runner = Matter.Runner.create();
var counter = 0;

const GamePage = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [constraints, setContraints] = useState<DOMRect>();
  const [scene, setScene] = useState<any>();

  useEffect(() => {
    const bodies = Matter.Bodies;

    const engine = Matter.Engine.create({});

    const render = Matter.Render.create({
      element: boxRef.current ?? undefined,
      engine: engine,
      canvas: canvasRef.current ?? undefined,
      options: {
        background: ColorScheme.black,
        wireframes: false
      }
    });

    const floor = bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: ColorScheme.middle
      }
    });

    const ball = bodies.circle(100, -PARTICLE_SIZE, PARTICLE_SIZE, {
      restitution: PARTICLE_BOUNCYNESS,
      render: {
        fillStyle: ColorScheme.light
      }
    })
    
    Matter.World.add(engine.world, [floor, ball]);
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    const bounds = boxRef?.current?.getBoundingClientRect();
    setContraints(bounds);
    setScene(render);
  }, []);

  // main game loop
  Matter.Events.on(runner, 'afterTick', function(event) {
    counter += 1;

    if(scene){
      const ball = scene?.engine.world.bodies[1];
      var x = ball?.velocity.x;
      var y = ball?.velocity.y;
      if(keyMap['w']){
        y= -10;
      }
      if(keyMap['a']){
        x= -10;
      }
      if(keyMap['s']){
        y= 10
      }
      if(keyMap['d']){
        x= 10
      }

      Matter.Body.setVelocity(ball, {x,y});
    }
  })

  // input handling
  var keyMap: {[id:string] : any} = {}; 
  window.addEventListener('keydown',function(e){
    keyMap[e.key] = true;
  },true);    
  window.addEventListener('keyup',function(e){
    keyMap[e.key] = false;
  },true);

  useEffect(() => {
    window.onresize = () => {
      const bounds = boxRef?.current?.getBoundingClientRect();
      setContraints(bounds);
    }
  }, []);

  const addBall =() => {
    if (constraints && scene) {
      let { width } = constraints;
      let randomX = Math.floor(Math.random() * -width) + width;
      Matter.World.add(
        scene.engine.world,
        Matter.Bodies.circle(randomX, -PARTICLE_SIZE, PARTICLE_SIZE, {
          restitution: PARTICLE_BOUNCYNESS,
          render: {
            fillStyle: ColorScheme.light
          }
        })
      );
    }
  }

  useEffect(() => {
    if (constraints && scene) {
      const { width, height } = constraints;

      // Update canvas and bounds
      scene.bounds.max.x = width;
      scene.bounds.max.y = height;
      scene.options.width = width;
      scene.options.height = height;
      scene.canvas.width = width;
      scene.canvas.height = height;

      // Update floor
      const floor = scene.engine.world.bodies[0];
      Matter.Body.setPosition(floor, {
        x: width / 2,
        y: height + STATIC_DENSITY / 2
      });

      Matter.Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 0, y: height + STATIC_DENSITY }
      ]);
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