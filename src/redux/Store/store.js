import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Slices/AuthSlice'
import dailyProgressReducer from '../Slices/DailyProgressSlice'
import assignmentReducer from '../Slices/AssignmentSlice'
import announcementReducer from '../Slices/AnnouncementSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dailyProgress: dailyProgressReducer,
    assignments: assignmentReducer,
    announcements: announcementReducer,
  },
})