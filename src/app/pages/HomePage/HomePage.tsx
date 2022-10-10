import NavItem from "./components/NavItem/NavItem";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Time from "./components/Time/Time";

import styles from './HomePage.module.scss';
import { useEffect, useState } from "react";

function HomePage() {
    const [imgSrc, setImgSrc] = useState('');


    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 6);
        const imageUrl = `/images/${randomNumber}.gif`;

        const loadImg = new Image()
        loadImg.src = imageUrl;

        loadImg.onload = () => {
            setTimeout(() => {
                setImgSrc(imageUrl)
            }, 2000)
        }
    }, [])

    return (
        <>
            {imgSrc ?
                (<div className={styles.ImgDiv}>
                    <img className={styles.BgImg} src={imgSrc} alt="idk" />
                    <section className="pt-16 h-fit" data-testid="HomePage" >
                        <div className="text-white h-fit">
                            <section className="LinkTopContainer">
                                <a href="https://gitlab.com/SamuelSlavka/site">
                                    <span className='LinkTop'>{"git repo"}</span>
                                </a>
                            </section>
                            <h1 className={styles.HeaderText}>
                                Hello there
                            </h1>
                            <Time />
                            <div className="mt-8 md:mt-36 text-center flex w-100 flex-wrap justify-center">
                                <NavItem name="Jelly" link="jelly" icon={solid("jar")} />
                                <NavItem name="Shelf" link="shelf" icon={solid("book")} />
                                <NavItem name="Nextcloud" link="next" icon={solid("cloud")} />

                                <Link to="/lunch">
                                    <NavItem name="Lunch" icon={solid("bowl-food")} />
                                </Link>
                                <Link to="/game">
                                    <NavItem name="Game" icon={solid("gamepad")} />
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>)
                :
                (<section className="bg-black text-white min-h-full">
                    <h3 className="text-center text-md font-bold py-16">Loading ...</h3>
                </section>)
            }
        </>
    );
}

export default HomePage;
