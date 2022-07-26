import NavItem from "./components/NavItem/NavItem";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Time from "./components/Time/Time";

import styles from './HomePage.module.scss';

function HomePage() {
    return (
        <div className="overflow-auto HideScrollbars inline-block relative min-w-full min-h-fit h-full object-cover">
            <section className="h-fit" data-testid="HomePage" >
                <div className="text-white h-fit HideScrollbars">
                    <section className="LinkTopContainer">
                        <a href="https://gitlab.com/SamuelSlavka/site">
                            <span className='LinkTop'>{"git repo"}</span>
                        </a>
                    </section>
                    <h1 className={`${styles.HeaderText} pt-8  lg-pt-16 xl:pt-20`}>
                        Hello there
                    </h1>
                    <Time />
                    <div className="mt-8 mb-6 md:mt-8 lg:mt-16 xl:mt-32 2xl:mt-40 text-center flex w-100 flex-wrap justify-center">
                        <NavItem name="Game" link="game" icon={solid("gamepad")} />
                        <NavItem name="Jelly" link="jelly" icon={solid("jar")} />
                        <NavItem name="Shelf" link="shelf" icon={solid("book")} />
                        <NavItem name="Next" link="next" icon={solid("cloud")} />

                        <Link to="/lunch">
                            <NavItem name="Lunch" icon={solid("bowl-food")} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>)
}

export default HomePage;
