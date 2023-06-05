import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./app/store";
import { PitchSet } from "./common/pitch-set";

export interface AppState {
  pitchSets: PitchSet[];
}

const initialState: AppState = {
  pitchSets: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updatePitchSet: (state, action: PayloadAction<PitchSet>) => {
      const idx = state.pitchSets.findIndex(
        (v) => v.title === action.payload.title
      );

      if (idx !== -1) {
        state.pitchSets[idx] = action.payload;
      } else {
        state.pitchSets = [...state.pitchSets, action.payload];
      }
    },

    deletePitchSet: (state, action: PayloadAction<PitchSet>) => {
      state.pitchSets = state.pitchSets.filter(
        (v) => v.title !== action.payload.title
      );
    },
  },
});

export const { updatePitchSet, deletePitchSet } = appSlice.actions;
export const selectPitchSets = (state: RootState) => state.app.pitchSets;

export default appSlice.reducer;
