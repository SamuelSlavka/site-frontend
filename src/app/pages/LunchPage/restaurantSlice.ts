import { RootState } from '../../store';
import { client } from '../../api/client';
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
        restaurantsLoaded: (state: RestaurantState, action: PayloadAction<{ restaurants: RestaurantModel[] }>) => {
            state = restaurantAdapter.upsertMany(state, action.payload.restaurants);
            state.loading = false;
        },
        restaurantsLoading(state: RestaurantState) {
            state.loading = true;
        },
        toggleRestaurant: (state: RestaurantState, action: PayloadAction<{ id: string }>) => {
            const restaurant = state.entities[action.payload.id];
            if (restaurant && action.payload.id) {
                restaurant.selected = !state.entities[action.payload.id]?.selected;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRestaurants.fulfilled,
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
        )
    }
});

export const {
    selectById: selectRestaurantById,
  } = restaurantAdapter.getSelectors((state: RootState) => state.restaurant)

export const { toggleRestaurant, restaurantsLoading, restaurantsLoaded } = restaurantSlice.actions;
export default restaurantSlice.reducer;


export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetch',
    async (thunkAPI) => {
        const response = await client.get('restaurants');
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