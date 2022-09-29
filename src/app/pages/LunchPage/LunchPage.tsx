import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchLunch,
    selectFilteredLunches,
    selectFilteredRestaurants,
} from "./lunchSlice";

// import styles from './LunchPage.module.scss';

import store from 'src/app/store';
import { LunchValue, Restaurnat } from "./lunchModel";
import RestaurantSelect from "./components/RestaurantSelect/RestaurantSelect";

interface LunchPageProps { }

const LunchPage: FC<LunchPageProps> = () => {
    const lunches = useSelector(selectFilteredLunches);
    const restaurans = useSelector(selectFilteredRestaurants);

    // const dispatch = useDispatch();

    const lunchList = lunches?.map((lunch: LunchValue, index: number) => (
        <section key={index} className="text-center my-2">
            {lunch.value}
        </section>
    ));

    const restaurantList = restaurans?.map((restaurant: Restaurnat, index: number) => (
        <section key={index} className="text-center my-2">
            {restaurant.endpoint}
        </section>
    ));

    useEffect(() => {
        store.dispatch(fetchLunch("newRestaurant"));
        return () => { };
    }, []);

    return (
        // className={styles.LunchPage}
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
            {restaurantList}
        </div>
    );
};

export default LunchPage;
