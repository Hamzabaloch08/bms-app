import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

export const getNotifications = createAsyncThunk('notifications/get', async (params, { rejectWithValue }) => {
    try {
        const page = params?.page || 1
        const limit = params?.limit || 15
        const response = await api.get(`/notifications?page=${page}&limit=${limit}`)
        console.log("notifications response", response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.message || error.data)
    }
})

export const markAllNotificationsRead = createAsyncThunk('notifications/mark-all-read', async (_, { rejectWithValue }) => {
    try {
        const response = await api.put('/notifications/mark-read')
        return response.data
    } catch (error) {
        return rejectWithValue(error.message || error.data)
    }
})

export const markSingleNotificationRead = createAsyncThunk('notifications/mark-single-read', async (id, { rejectWithValue }) => {
    try {
        const response = await api.put(`/notifications/${id}/read`)
        return { ...response.data, id }
    } catch (error) {
        return rejectWithValue(error.message || error.data)
    }
})
