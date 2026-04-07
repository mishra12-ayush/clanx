import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1, // 1: Event, 2: Reward, 3: Date
  event: { id: null, value: '' },
  reward: { id: null, value: '' },
  expiryDate: null,
};

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    setStep: (state, action) => { state.currentStep = action.payload; },
    updateEvent: (state, action) => { state.event = { ...state.event, ...action.payload }; },
    updateReward: (state, action) => { state.reward = { ...state.reward, ...action.payload }; },
    setExpiry: (state, action) => { state.expiryDate = action.payload; },
    resetForm: () => initialState,
  },
});

export const { setStep, updateEvent, updateReward, setExpiry, resetForm } = gamificationSlice.actions;
export default gamificationSlice.reducer;