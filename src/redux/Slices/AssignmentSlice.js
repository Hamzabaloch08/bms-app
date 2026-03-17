import { createSlice } from "@reduxjs/toolkit";
import { getAllAssignments, getCompletedAssignments, submitAssignment } from "../Thunks/AssignmentThunks";

const initialState = {
  loading: false,
  error: null,
  assignmentList: [],
  completedList: [],
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignmentList = action.payload.data || action.payload;
        state.error = false;
      })
      .addCase(getCompletedAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompletedAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.completedList = action.payload.submissions || action.payload;
        state.error = null;
      })
      .addCase(getCompletedAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAssignment.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
;
  },
});

export default assignmentSlice.reducer;
export const { clearState } = assignmentSlice.actions;
