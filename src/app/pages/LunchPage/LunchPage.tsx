import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllLunches, selectFilteredLunches } from "./store/lunchSlice";
import { fetchAllRestaurants } from "./store/restaurantSlice";
import store from '../../store';
import { LunchValue } from "./store/lunchModel";
import RestaurantSelect from "./components/RestaurantSelect/RestaurantSelect";
import LunchCard from "./components/LunchCard/LunchCard";
import styles from './LunchPage.module.scss';

const LunchPage = () => {
    const lunches = useSelector(selectFilteredLunches);

    const lunchList = lunches?.map((lunch: LunchValue, lunchIndex: number) => (
        <LunchCard key={lunchIndex} lunch={lunch} />
    ));

    useEffect(() => {
        store.dispatch(fetchAllRestaurants());
        store.dispatch(fetchAllLunches());
    }, []);

    return (
        <div data-testid="LunchPage" className="bg-black overflow-auto HideScrollbars inline-block relative min-w-full min-h-fit h-full object-cover">
            <section>
                <h1 className="text-center pt-16">
                    <span className={styles.HeaderText}>
                        Lunch
                    </span>
                </h1>
            </section>
            <section className="LinkTopContainer">
                <Link to="/">
                    <span className='LinkTop'>{"< home"}</span>
                </Link>
            </section>
            <section className="m-4 ">
                <RestaurantSelect />
            </section>
            <section className="p-4 flex w-100 flex-wrap justify-center transition-all ease-in-out duration-300">
                {lunchList}
            </section>
        </div>
    );
};

export default LunchPage;
