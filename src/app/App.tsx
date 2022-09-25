import "./App.scss";
import NavItem from "./components/NavItem/NavItem";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Time from "./components/Time/Time";


function App() {
  return (
    <section className="py-16 bg-black h-full" data-testid="AppContainer"> 
      <div className="text-white">
        <i className="fa-solid fa-jar" />
        <h1 className="text-center text-5xl font-bold mb-16">Hello there</h1>
        <Time />
        <div className="m-16 text-center flex w-100 flex-wrap justify-center">

          {/* <FontAwesomeIcon icon={} /> */}
          <NavItem name="Jelly" link={{sub:"jelly"}} icon={solid('jar')}/>
          <NavItem name="Shelf" link={{sub:"shelf"}} icon={solid('book')}/>
          <NavItem name="Lunch" link={{path:"lunch"}} icon={solid('bowl-food')}/>
        </div>
      </div>
    </section>
  );
}

export default App;
