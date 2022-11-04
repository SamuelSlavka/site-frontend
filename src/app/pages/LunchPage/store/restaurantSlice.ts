import { RootState } from '@app/store';
import { client } from '../../../api/client';
import { toast } from 'react-toastify';

import {
    createEntityAdapter, createAsyncThunk, createSelector, createSlice, PayloadAction
} from '@reduxjs/toolkit';
import { RestaurantModel, RestaurantState } from './restaurantModel';

const restaurantAdapter = createEntityAdapter<RestaurantModel>({
    selectId: (restaurant) => restaurant.id,
    sortComparer: (a, b) => a.restaurant_name.localeCompare(b.restaurant_name),
})

const initialState: RestaurantState = restaurantAdapter.getInitialState({
    loading: false,
});

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: initialState,
    reducers: {
        toggleRestaurant: (state: RestaurantState, action: PayloadAction<{ id: string }>) => {
            const restaurant = state.entities[action.payload.id];
            if (restaurant && action.payload.id) {
                restaurant.selected = !state.entities[action.payload.id]?.selected;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllRestaurants.fulfilled,
            (state: RestaurantState, action: PayloadAction<RestaurantModel[]>) => {
                const selectedPayload: RestaurantModel[] = [];
                action.payload.map(restaurant => {
                    const currentRestaurant = state.entities[restaurant.id]?.selected;
                    // if the restaurant is not in store set its selection to true
                    selectedPayload.push(
                        {
                            ...restaurant,
                            selected: currentRestaurant === undefined ? true : currentRestaurant ?? false,
                        });
                    return 0;
                })
                state = restaurantAdapter.removeAll(state);
                state = restaurantAdapter.setMany(state, selectedPayload);
                state.loading = false;
            },
        );
        builder.addCase(fetchAllRestaurants.pending,
            (state: RestaurantState) => {
                state.loading = true;
            },
        )
        builder.addCase(fetchAllRestaurants.rejected,
            (state: RestaurantState) => {
                toast.error("Load failed", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
                state.loading = false;
            },
        )
    }
});

export const {
    selectById: selectRestaurantById,
} = restaurantAdapter.getSelectors((state: RootState) => state.restaurant)

export const { toggleRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;


export const fetchAllRestaurants = createAsyncThunk(
    'all_restaurants/fetch',
    async () => {
        const response = await client.get('all_restaurants');
        return response.data
    }
)

export const selectRestaurantEntities = (state: RootState) =>
    state.restaurant.entities;


export const selectRestaurants = createSelector(
    selectRestaurantEntities,
    (entities) => {
        const keys = Object.keys(entities);
        return keys.map((key) => {
            return { id: key, ...entities[key] };
        });
    }
);

export const selectFilteredRestaurants = createSelector(
    selectRestaurants,
    (restaurants) => restaurants.filter((restaurant) => restaurant && restaurant.selected)
);