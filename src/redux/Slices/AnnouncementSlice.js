import { createSlice } from "@reduxjs/toolkit";
import { getAnnouncements } from "../Thunks/AnnouncementThunks";

const initialState = {
  loading: false,
  error: null,
  announcements: [],
  lastFetchedAt: null,
};

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload.data || action.payload;
        state.lastFetchedAt = Date.now();
        state.error = null;
      })
      .addCase(getAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default announcementSlice.reducer;
export const { clearState } = announcementSlice.actions;
