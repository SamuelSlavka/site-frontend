import React, { FC, useEffect, useRef } from "react";
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

interface LunchPageProps { }

const LunchPage: FC<LunchPageProps> = () => {
    const restaurants = useSelector(selectRestaurants);
    const lunches = useSelector(selectFilteredLunches);
    const lunchesLoaded = useRef<boolean>(false);

    const lunchList = lunches?.map((lunch: LunchValue, lunchIndex: number) => (
        <section key={lunchIndex} className="my-8">
            {(lunch.value ?? []).map((valueItem: string, valueIndex: number) => 
                <section key={valueIndex} className="text-center my-2">
                    {valueItem}
                </section>
            )}
        </section>
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
                <h1 className="text-center text-5xl font-bold mt-16">Lunch</h1>
            </section>
            <section className="text-center mt-4 mb-8">
                <Link to="/">
                    <span>{"< home"}</span>
                </Link>
            </section>
            <RestaurantSelect />
            {lunchList}
        </div>
    );
};

export default LunchPage;
