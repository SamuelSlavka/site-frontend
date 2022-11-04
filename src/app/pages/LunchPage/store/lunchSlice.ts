import { RootState } from '@app/store';
import { LunchState, LunchValue } from './lunchModel';
import { createAsyncThunk, createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { client } from '../../../api/client';
import { selectRestaurantEntities } from './restaurantSlice';
import { toast } from 'react-toastify';

const initialState: LunchState = {
    lunches: [],
    loading: false,
};

export const lunchSlice = createSlice({
    name: 'lunch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLunches.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchLunches.fulfilled, (state, action) => {
            state.lunches = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAllLunches.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllLunches.fulfilled, (state, action) => {
            state.lunches = action.payload;
            state.loading = false;
        });
        builder.addMatcher(isAnyOf (fetchAllLunches.rejected, fetchLunches.rejected), (state) => {
            toast.error("Load failed", { theme: "dark", autoClose: 2000, pauseOnFocusLoss: false });
            state.loading = false;
        });
    }
});

export default lunchSlice.reducer;

export const fetchLunches = createAsyncThunk(
    'lunches/fetch',
    async (restaurantList: string[]) => {
        const response = await client.post('lunches', {restaurantIds: restaurantList});
        return response.data
    }
)


export const fetchAllLunches = createAsyncThunk(
    'all_lunches/fetch',
    async () => {
        const response = await client.get('all_lunches');
        return response.data
    }
)

const selectLunches = (state: RootState) => state.lunch.lunches;

export const selectFilteredLunches = createSelector(
    selectRestaurantEntities,
    selectLunches,
    (restaurants, lunches) => {
        return lunches?.filter(
            (lunch: LunchValue) => restaurants[lunch.restaurant_id]?.selected === true
        );
    }
);
