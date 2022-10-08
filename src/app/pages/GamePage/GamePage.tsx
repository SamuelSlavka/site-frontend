import React, { FC, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./GamePage.module.scss";
import { Container, useApp, Sprite, Stage, useTick, Graphics, AppProvider } from '@inlet/react-pixi';
import { ColorScheme } from '../../enums/ColorScheme'
import { Application } from 'pixi.js';

interface GamePageProps { }

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

interface RectangleState {
    x: number
    y: number
    width: number
    height: number
    color: number
  }

  interface RectangleAction {
    payload: RectangleState;
  }

  interface RectangleProps {
    offset: number;
  }

  const InitialState: RectangleState = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: 0
  }

  const Rectangle = (props: RectangleProps) => { 
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
    useEffect(() => {
        window.onresize = function (event){
            setWindowDimensions(getWindowDimensions());
        }
    },[]);

    const reducer = (state: RectangleState, action: RectangleAction) => action.payload;

    const [motion, update] = useReducer(reducer, InitialState);
    const iter = useRef(0)
    useTick(delta => {
        const newY = ((iter.current - 2 ) - props.offset * 100 + 1000) % windowDimensions.height
        const newX = (iter.current += 2 ) % windowDimensions.width
        update({
            payload: {
                x: newX,
                y: newY,
                width: 50,
                height: 50,
                color: ColorScheme.middle
            }
        })
    })

    const draw = useCallback((g: any) => {
        g.clear();
        g.beginFill(motion.color);
        g.drawRect(motion.x, motion.y, motion.width, motion.height);
        g.endFill();
    }, [motion]);

    return (
        <Graphics draw={draw} />
    )
}

const GamePage: FC<GamePageProps> = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
    useEffect(() => {
        window.onresize = function (event){
            setWindowDimensions(getWindowDimensions());
        }
    },[]);

    return (
    <div data-testid="GamePage">
        <section className="text-right p-4 absolute top-0 right-0 h-16 w-32">
            <Link to="/">
                <span className={styles.LinkHome}>{"< home"}</span>
            </Link>
        </section>
        <section className="border-sky-500 min-h-screen overflow-hidden border-2 border-sky-500">
            <Stage width={windowDimensions.width-4} height={windowDimensions.height-4} options={{ backgroundAlpha: 0, antialias: true, autoDensity: true }}>
                <Rectangle key={1} offset={1} />
            </Stage>
        </section>
    </div>
    )
};

export default GamePage;
