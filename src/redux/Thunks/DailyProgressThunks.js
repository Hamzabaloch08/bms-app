import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const submitProgress = createAsyncThunk(
  "/progress/submit",
  async (payload, { rejectWithValue }) => {
    try {
        const user = JSON.parse(await AsyncStorage.getItem('user'))
        console.log(user)
      const response = await api.post("/progress/submit", payload, {
        headers: {
          "Content-Type": "application/json",
          bootcampId:user.bootcampId
        },
      });
      return response.data;
    } catch (error) {
      console.log("Backend error data:", error.response?.data);
      const data = error.response?.data;
      return rejectWithValue(
        data?.message || data?.error || data?.msg || error.message,
      );
    }
  },
);

export const updateProgress = createAsyncThunk('/progress/update', async ({ id, ...payload }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/progress/update/${id}`, payload, {
            headers: { 'Content-Type': 'application/json' },
        })
        return response.data
    } catch (error) {
        console.log("Backend error data:", error.response?.data)
        const data = error.response?.data
        return rejectWithValue(data?.message || data?.error || data?.msg || error.message)
    }
})

export const getMyProgress = createAsyncThunk('/progress/my-progress',async(_,{rejectWithValue})=>{
    try {
        const response = await api.get('/progress/my-progress')
        console.log("my-progress response", response.data)
        return response.data
    }catch(error){
        console.log("Backend error data:", error.response?.data);
        const data = error.response?.data;
        return rejectWithValue(data?.message || data?.error || data?.msg || error.message)
    }
})
