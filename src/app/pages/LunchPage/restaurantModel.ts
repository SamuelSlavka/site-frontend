import { EntityState } from "@reduxjs/toolkit";

export interface RestaurantState extends EntityState<RestaurantModel> {
    loading: boolean;
}

export interface RestaurantModel {
    id: string,
    restaurant_name: string,
    restaurant_description: string,
    restaurant_endpoint: string,
    selected: boolean,
}