import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

export const getAnnouncements = createAsyncThunk('/announcement/get-announcements',async(_,{rejectWithValue})=>{
    try {
        const response = await api.get('/announcement/all')
        console.log("announcements response",response.data)
        return response.data
    }catch(error){
        return rejectWithValue(error.message || error.data)
    }
})