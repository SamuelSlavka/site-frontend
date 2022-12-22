import NavItem from "./components/NavItem/NavItem";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Time from "./components/Time/Time";

import styles from './HomePage.module.scss';

function HomePage() {
    return (
        <div className="h-full">
            <div className="LinkTopContainer">
                <a href="https://gitlab.com/SamuelSlavka/site">
                    <span className='LinkTop'>{"git repo"}</span>
                </a>
            </div>
            <div className="flex flex-col md:flex-row HideScrollbars relative min-w-full min-h-fit h-full object-cover">
                <div className={styles.SideBar} data-testid="HomePage" >
                    <div className="text-white h-fit HideScrollbars">
                        <h1 className={`${styles.HeaderText} pt-8 lg-pt-16 xl:pt-20`}>
                            Hello there
                        </h1>
                    </div>
                    <div className="hidden md:block">
                        <Time/>
                    </div>
                </div>
                <div className={`${styles.NavContainer} w-full h-fit flex flex-wrap justify-center pt-2 md:pt-6 pb-4 pr-4`}>
                    <NavItem name="Flappy bird" route="http://game.sam-sla.net" bg="#1c478c" icon={solid("gamepad")} />
                    <NavItem name="Jellyfin" route="http://jelly.sam-sla.net" icon={solid("jar")} />
                    <NavItem name="Audiobookshelf" route="http://shelf.sam-sla.net" icon={solid("book")} />
                    <NavItem name="NextCloud" route="http://next.sam-sla.net" icon={solid("cloud")} />
                    <NavItem name="Lunch" link="/lunch" icon={solid("bowl-food")} />
                </div>
            </div>
        </div>)
}

export default HomePage;
