import { createSlice } from "@reduxjs/toolkit";
import { submitProgress, getMyProgress, updateProgress } from "../Thunks/DailyProgressThunks";

const initialState = {
  loading: false,
  error: null,
  progressList: [],
};

const dailyProgressSlice = createSlice({
  name: "dailyProgress",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(submitProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitProgress.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progressList = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(getMyProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dailyProgressSlice.reducer;
