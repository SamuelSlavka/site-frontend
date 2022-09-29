import { RootState } from '@app/store';
import { LunchState, LunchValue } from './lunchModel';
import { client } from 'src/app/api/client';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: LunchState = {
    restaurants: {
        '01': { endpoint: '/pok', selected: true },
        '02': { endpoint: '/tus', selected: true },
        '03': { endpoint: '/ska', selected: true },
    },
    lunches: [
        { value: 'm1', restaurantId: '01' },
        { value: 'm12', restaurantId: '01' },
        { value: 'm2', restaurantId: '02' },
    ],
    loading: false,
};

export const lunchSlice = createSlice({
    name: 'lunch',
    initialState,
    reducers: {
        lunchLoaded: (state, action: PayloadAction<{ value: LunchValue }>) => {
            state.lunches.push(action.payload.value);
            state.loading = false;
        },
        lunchLoading(state) {
            state.loading = true;
        },
        toggleRestaurant: (state, action: PayloadAction<{ id: string }>) => {
            const restaurantId = action.payload.id;
            if (state.restaurants[restaurantId]) {
                state.restaurants[restaurantId].selected =
                    !state.restaurants[restaurantId].selected;
            }
        },
    },
});

export const { lunchLoaded, lunchLoading, toggleRestaurant } =
    lunchSlice.actions;
export default lunchSlice.reducer;

export const fetchLunch = (restaurantId: string) => async (dispatch: any) => {
    dispatch(lunchLoading());
    const response = await client.get('stuff');
    dispatch(lunchLoaded({ value: { value: response, restaurantId } }));
};

export const selectRestaurantEntities = (state: RootState) =>
    state.lunch.restaurants;

export const selectRestaurantById = (
    state: RootState,
    restaurantId: string
) => {
    return selectRestaurantEntities(state)[restaurantId];
};

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
    (restaurnats) => restaurnats.filter((restaurant) => restaurant.selected)
);

export const selectLunches = (state: RootState) => state.lunch.lunches;

export const selectFilteredLunches = createSelector(
    selectRestaurantEntities,
    selectLunches,
    (restaurnats, lunches) => {
        return lunches?.filter(
            (lunch) => restaurnats[lunch.restaurantId]?.selected === true
        );
    }
);
