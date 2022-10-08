import NavItem from "./components/NavItem/NavItem";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Time from "./components/Time/Time";

import styles from './HomePage.module.scss';

function HomePage() {
    return (
        <section className="pt-16 bg-black h-full" data-testid="HomePage">
            <div className="text-white">
                <section className="text-right p-4 absolute top-0 right-0 h-16 w-32">
                    <a href="https://gitlab.com/SamuelSlavka/site">
                        <span className={styles.LinkGit}>{"git repo"}</span>
                    </a>
                </section>
                <h1 className={styles.HeaderText}>
                    Hello there
                </h1>
                <Time />
                <div className="mt-8 text-center flex w-100 flex-wrap justify-center">
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
