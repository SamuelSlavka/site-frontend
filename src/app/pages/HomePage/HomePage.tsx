import NavItem from "./components/NavItem/NavItem";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Time from "./components/Time/Time";

function HomePage() {
    return (
        <section className="py-16 bg-black h-full" data-testid="HomePage">
            <div className="text-white">
                <h1 className="text-center text-5xl font-bold mb-16">
                    Hello there
                </h1>
                <Time />
                <div className="m-16 text-center flex w-100 flex-wrap justify-center">
                    <NavItem name="Jelly" link="jelly" icon={solid("jar")} />
                    <NavItem name="Shelf" link="shelf" icon={solid("book")} />
                    <NavItem name="Nextcloud" link="next" icon={solid("cloud")} />

                    <Link to="/lunch">
                        <NavItem name="Lunch" icon={solid("bowl-food")} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
