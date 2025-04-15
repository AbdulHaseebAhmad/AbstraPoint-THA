// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const  initialState = { sheetId:'',pinnedRowId:null }

const uiSlice = createSlice({
  name: 'uiclice',
  initialState,
  reducers: {
    setCurrentSheetId: (state,action) => {
      state.sheetId = action.payload;
    },
    setPinnedRow : (state,action) => {
      state.pinnedRowId = action.payload
    }
  },
});

export const { setCurrentSheetId,setPinnedRow } = uiSlice.actions;

export default uiSlice.reducer;
