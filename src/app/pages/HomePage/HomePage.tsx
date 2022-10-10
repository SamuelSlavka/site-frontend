import NavItem from "./components/NavItem/NavItem";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Time from "./components/Time/Time";

import styles from './HomePage.module.scss';

function HomePage() {
    const randomNumber = Math.floor(Math.random() * 6);
    return (
        <section className="pt-16 h-fit" data-testid="HomePage"
            style={{
                minHeight: 'inherit',
                backgroundImage: `url( /images/${randomNumber}.gif )`,
                backgroundSize: "cover",
            }}
        >
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
    );
}

export default HomePage;
