import { configureStore } from '@reduxjs/toolkit'
import lunchReducer from './pages/LunchPage/lunchSlice'

const store = configureStore({
  reducer: {
    lunch: lunchReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;