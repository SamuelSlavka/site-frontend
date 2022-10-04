import { RootState } from '@app/store';
import { LunchState, LunchValue } from './lunchModel';
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../../../api/client';
import { selectRestaurantEntities } from './restaurantSlice';

const initialState: LunchState = {
    lunches: [],
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLunches.fulfilled, (state, action) => {
            state.lunches = action.payload;
            state.loading = true;
        })
        builder.addCase(fetchAllLunches.fulfilled, (state, action) => {
            state.lunches = action.payload;
            state.loading = true;
        })
    }
});

export const { lunchLoaded, lunchLoading } = lunchSlice.actions;
export default lunchSlice.reducer;

export const fetchLunches = createAsyncThunk(
    'lunches/fetch',
    async (restaurantList: string[],thunkAPI) => {
        const response = await client.post('lunches', {restaurantIds: restaurantList});
        return response.data
    }
)


export const fetchAllLunches = createAsyncThunk(
    'all_lunches/fetch',
    async (thunkAPI) => {
        const response = await client.get('all_lunches');
        return response.data
    }
)

export const selectLunches = (state: RootState) => state.lunch.lunches;

export const selectFilteredLunches = createSelector(
    selectRestaurantEntities,
    selectLunches,
    (restaurants, lunches) => {
        return lunches?.filter(
            (lunch: LunchValue) => restaurants[lunch.restaurant_id]?.selected === true
        );
    }
);
