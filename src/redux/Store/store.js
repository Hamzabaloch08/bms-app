import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Slices/AuthSlice'
import dailyProgressReducer from '../Slices/DailyProgressSlice'
import assignmentReducer from '../Slices/AssignmentSlice'
import announcementReducer from '../Slices/AnnouncementSlice'
import notificationReducer from '../Slices/NotificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dailyProgress: dailyProgressReducer,
    assignments: assignmentReducer,
    announcements: announcementReducer,
    notifications: notificationReducer,
  },
})