import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchLunch,
    selectFilteredLunches,
} from "./lunchSlice";

import store from 'src/app/store';
import { LunchValue } from "./lunchModel";
import RestaurantSelect from "./components/RestaurantSelect/RestaurantSelect";

interface LunchPageProps { }

const LunchPage: FC<LunchPageProps> = () => {
    const lunches = useSelector(selectFilteredLunches);

    const lunchList = lunches?.map((lunch: LunchValue, index: number) => (
        <section key={index} className="text-center my-2">
            {lunch.value}
        </section>
    ));

    useEffect(() => {
        store.dispatch(fetchLunch("01"));
        return () => { };
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
