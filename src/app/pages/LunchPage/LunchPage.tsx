import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchLunches,
    selectFilteredLunches,
} from "./lunchSlice";
import { fetchRestaurants, selectRestaurants } from "./restaurantSlice";
import store from '../../store';
import { LunchValue } from "./lunchModel";
import RestaurantSelect from "./components/RestaurantSelect/RestaurantSelect";
import LunchCard from "./components/LunchCard/LunchCard";

const LunchPage = () => {
    const restaurants = useSelector(selectRestaurants);
    const lunches = useSelector(selectFilteredLunches);
    const lunchesLoaded = useRef<boolean>(false);

    const lunchList = lunches?.map((lunch: LunchValue, lunchIndex: number) => (
        <LunchCard key={lunchIndex} lunch={lunch} />
    ));

    useEffect(() => {
        store.dispatch(fetchRestaurants());
    }, []);

    // run only on first restarants load 
    useEffect(() => {
        if(!lunchesLoaded.current){
            const allIds = restaurants.map((restaurant) => restaurant.id);
            store.dispatch(fetchLunches(allIds));
            lunchesLoaded.current = true;
        }
    }, [restaurants]);

    return (
        <div data-testid="LunchPage">
            <section>
                <h1 className="text-center text-5xl font-bold mt-16 transition-all ease-in-out duration-200 hover:text-light">Lunch</h1>
            </section>
            <section className="text-right p-4 absolute top-0 right-0 h-16 w-32">
                <Link to="/">
                    <span className="transition-all hover:text-light ease-in-out duration-200">{"< home"}</span>
                </Link>
            </section>
            <section className="m-4 ">
                <RestaurantSelect />
            </section>
            <section className="m-4 flex w-100 flex-wrap justify-center">
                {lunchList}
            </section>
        </div>
    );
};

export default LunchPage;
