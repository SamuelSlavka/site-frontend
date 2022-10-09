import Matter from "matter-js";
import { FC, useEffect, useRef, useState } from "react";
import { ColorScheme } from "../../../../enums/ColorScheme";
import { Constants } from "../../enums/gameConstants";
import { addListeners, handleKeypress } from "../../utils/input_handling";

interface MasterContainerProps {
  boxRef: React.RefObject<HTMLDivElement>,
  keyMap: { [id: string]: any } 
}

export const MasterContainer: FC<MasterContainerProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [constraints, setConstraints] = useState<DOMRect>();
  const [scene, setScene] = useState<any>();

    // Matter setup
    useEffect(() => {
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
        element: props.boxRef.current ?? undefined,
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
  
      const floor = Bodies.rectangle(0, 0, 0, Constants.STATIC_DENSITY, {
        isStatic: true,
        render: {
          fillStyle: ColorScheme.middle
        }
      });
  
      var circle = Bodies.polygon(300, 400, 8, 200, { density: 0.004 });
      var control = Bodies.polygon(300, 400, 8, 20, { density: 0.004 });
      const anchor = { x: 300, y: 400 };
      const elastic = Constraint.create({
        pointA: anchor,
        bodyB: control,
        stiffness: 0.08,
        render: {
          lineWidth: 0
        }
      });
  
      const ball = Bodies.circle(100, -Constants.PARTICLE_SIZE, Constants.PARTICLE_SIZE, {
        restitution: Constants.PARTICLE_BOUNCYNESS,
        render: {
          fillStyle: ColorScheme.light
        }
      })
  
      Composite.add(world, [floor, ball, control, elastic, circle]);
      Matter.Render.run(render);
  
      // add mouse control
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });
  
      Matter.Events.on(runner, 'afterUpdate', function (event) {
        if (mouseConstraint.mouse.button === -1 && (control.position.x > 190 || control.position.y < 430)) {
  
        }
      });
  
  
      Composite.add(world, mouseConstraint);
  
      // keep the mouse in sync with rendering
      render.mouse = mouse;
  
      var counter = 0;
      // main game loop
      Matter.Events.on(runner, 'afterTick', function (event) {
        counter += 1;
        const ball = world.bodies[1];
        const { x, y } = handleKeypress(props.keyMap, ball);
        Matter.Body.setVelocity(ball, { x, y });
      })
  
      const bounds = props.boxRef?.current?.getBoundingClientRect();
      setConstraints(bounds);
      setScene(render);
    }, []);
  
    
  return <canvas ref={canvasRef} />
}