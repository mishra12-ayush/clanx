import { configureStore } from '@reduxjs/toolkit';
import gamificationReducer from './gamificationSlice';

export const store = configureStore({
  reducer: { gamification: gamificationReducer },
});