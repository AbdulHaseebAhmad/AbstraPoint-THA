// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../Redux/UI/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});
