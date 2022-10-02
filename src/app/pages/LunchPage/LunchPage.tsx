import React, { FC, useEffect } from "react";
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
    const lunches = useSelector(selectFilteredLunches);
    const restaurants = useSelector(selectRestaurants);
    const lunchList = lunches?.map((lunch: LunchValue, index: number) => (
        <section key={index} className="text-center my-2">
            {lunch.restaurant_id}
        </section>
    ));

    useEffect(() => {
        return () => {
            const allIds = restaurants.map((restaurant) => restaurant.id);
            store.dispatch(fetchRestaurants());
            store.dispatch(fetchLunches(allIds));
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
