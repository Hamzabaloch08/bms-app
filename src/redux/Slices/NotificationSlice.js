import { createSlice } from "@reduxjs/toolkit";
import { getNotifications, markAllNotificationsRead, markSingleNotificationRead } from "../Thunks/NotificationThunks";

const initialState = {
    loading: false,
    error: null,
    notifications: [],
    unreadCount: 0,
    pagination: null,
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        clearNotifications: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Get Notifications
            .addCase(getNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false;
                const page = action.payload.pagination?.currentPage || 1;
                if (page === 1) {
                    state.notifications = action.payload.data || [];
                } else {
                    state.notifications = [...state.notifications, ...(action.payload.data || [])];
                }
                state.unreadCount = action.payload.unreadCount || 0;
                state.pagination = action.payload.pagination || null;
                state.error = null;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Mark All Read
            .addCase(markAllNotificationsRead.fulfilled, (state) => {
                state.notifications = state.notifications.map(n => ({ ...n, unread: false }));
                state.unreadCount = 0;
            })

            // Mark Single Read
            .addCase(markSingleNotificationRead.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.notifications = state.notifications.map(n =>
                    n.id === id ? { ...n, unread: false } : n
                );
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            });
    },
});

export default notificationSlice.reducer;
export const { clearNotifications } = notificationSlice.actions;
