import NavItem from "./components/NavItem/NavItem";
import Time from "./components/Time/Time";

import styles from './HomePage.module.scss';

function HomePage() {
    const navItems = [
        {
            name: "Flappy bird", route: "http://game.sam-sla.net", bg: "#1c478c", icon: "gamepad"
        },
        {
            name: "Jellyfin", route: "http://jelly.sam-sla.net", icon: "jar"
        },
        {
            name: "Audiobookshelf", route: "http://shelf.sam-sla.net", icon: "book"
        },
        {
            name: "NextCloud", route: "http://next.sam-sla.net", icon: "cloud"
        },
        {
            name: "Grafana", route: "http://graph.sam-sla.net", icon: "chart-column"
        },
        {
            name: "Lunch", link: "/lunch", icon: "bowl-food"
        }
    ]

    const triggerEddit = () => {

    }

    return (
        <div className="h-full">
            <div className="LinkTopContainer">
                <a href="https://gitlab.com/SamuelSlavka/site">
                    <span className='LinkTop'>{"git repo"}</span>
                </a>
                <div className="cursor-pointer" onClick={() => triggerEddit()}>
                    <span className='LinkTop pr-2'>{"edit navs"}</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row HideScrollbars relative min-w-full min-h-fit h-full object-cover">
                <div className={styles.SideBar} data-testid="HomePage" >
                    <div className="text-white h-fit HideScrollbars">
                        <h1 className={`${styles.HeaderText} pt-12 lg:pt-16 xl:pt-20`}>
                            Hello there
                        </h1>
                    </div>
                    <div className="hidden sm:block">
                        <Time />
                    </div>
                </div>
                <div className={`${styles.NavContainer} w-full h-fit flex flex-wrap justify-center pt-2 sm:pt-12 lg:pt-16 xl:pt-18 pb-4 pr-4`}>
                    {navItems.map((navItem, index) =>
                        <NavItem key={index} name={navItem.name} route={navItem.route} link={navItem.link} bg={navItem.bg} icon={navItem.icon} />
                    )}
                </div>
            </div>
        </div>)
}

export default HomePage;
